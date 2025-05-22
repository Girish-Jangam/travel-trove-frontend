import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = 'https://travel-trove-backend-jfmn.onrender.com/api/v1/travelGroups'; // URL to your backend data
  // private apiUrl = 'https://3000-firebase-travelwebappgit-1746617609073.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev/api/v1/travelGroups'; // URL to your backend data

  constructor(private http: HttpClient, private authService:AuthService) {}

  // Get all public groups
  getPublicGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?isPublic=true`);
  }

  // Get groups where the user is a member
  getUserGroups(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?members_like=${userId}`);
  }

  // Get a specific group by ID
  getGroupById(groupId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${groupId}`);
  }

  // Create a new group
  createGroup(groupData: any, creatorId: string): Observable<any> {
    const newGroup = {
      ...groupData,
      creatorId: creatorId,
      members: [creatorId],
      messages: [] // Initialize messages array
    };
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl, newGroup, {headers});
  }

  // Join a group
  joinGroup(groupId: string, userId: string): Observable<any> {
    return this.getGroupById(groupId).pipe(
      switchMap(group => {
        if (group && !group.members.includes(userId)) {
          const updatedMembers = [...group.members, userId];
          const token = localStorage.getItem('token');
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return this.http.patch<any>(`${this.apiUrl}/${groupId}/join`, {
            members: updatedMembers
          }, {headers});
        }
        return of(group); // Return the group as is if already a member or not found
      })
    );
  }

  // Unjoin a group
  unjoinGroup(groupId: string, userId: string): Observable<any> {
    return this.getGroupById(groupId).pipe(
      switchMap(group => {
        if (group && group.members.includes(userId)) {
          const token = localStorage.getItem('token');
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          const updatedMembers = group.members.filter((member: string) => member !== userId);
          return this.http.patch<any>(`${this.apiUrl}/${groupId}/unjoin`, {
            members: updatedMembers
          }, {headers});
        }
        return of(group); // Return the group if the user is not found as a member
      })
    );
  }

  // Delete a group (only if the user is the creator)
  deleteGroup(groupId: string, creatorId: string): Observable<any> {
    return this.getGroupById(groupId).pipe(
      switchMap(group => {
        if (group && group.creatorId === creatorId) {
          return this.http.delete(`${this.apiUrl}/${groupId}`);
        }
        return of(null); // Return null if the user is not the creator of the group
      })
    );
  }

  // Get group messages
  getGroupMessages(groupId: string): Observable<any[]> {
    // console.log("groupId", groupId);
    return this.http.get<any>(`${this.apiUrl}/${groupId}/messages`).pipe(
      map(group => group.messages || [])
    );
  }

  // Send a message to a group
  sendMessage(groupId: string, message: any): Observable<any> {
    console.log('Fetching group:', groupId); // Debug log
    console.log('Sending message content:', message.content);  // Log the content here
    return this.http.get<any>(`${this.apiUrl}/${groupId}/messages`).pipe(
      switchMap(group => {
        if (!group) {
          console.error(`Group with ID ${groupId} not found.`);
          return of(null);
        }
        console.log('Current group:', group); // Debug log
        // let loggedInUserId = '';
        const updatedMessages = [...(group.messages || []), { content: message.content }];
        console.log('Updating messages:', updatedMessages); // Debug log
        // Use PATCH instead of POST to update the group
        console.log("updatedMessges", {messages: updatedMessages}.messages[0].content)
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.patch<any>(`${this.apiUrl}/${groupId}/messages`, {
          messages: updatedMessages
        }, {headers});
      })
    );
  }
}

