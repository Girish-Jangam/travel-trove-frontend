import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css'],
})
export class JoinGroupComponent implements OnInit {
  // loggedInUserId = 'user1';
  loggedInUserId!:string; // Replace with actual authentication logic
  publicGroups$: Observable<any> | undefined;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private groupService: GroupService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.publicGroups$ = this.groupService.getPublicGroups().pipe(
      map(groups => {
        return groups.map(group => ({
          ...group,
          isMember: group.members.includes(this.loggedInUserId)
        }));
      })
    );

    this.authService.getUserData().subscribe({
      next: (user) => {
        this.loggedInUserId = user._id;
      },  
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.errorMessage = 'Failed to fetch user data.';
      }
    });
  }
  
  // Join Group Function
  onJoinGroup(groupId: string): void {
    console.log(groupId);
    this.groupService.joinGroup(groupId, this.loggedInUserId).subscribe(
      (group) => {
        this.successMessage = 'Successfully joined the group!';
        this.errorMessage = ''; // Clear error message if successful

        // Update the group data locally
        this.publicGroups$ = this.publicGroups$!.pipe(
          map(groups => {
            return groups.map((group:any) => ({
              ...group,
              isMember: group.id === groupId ? true : group.isMember
            }));
          })
        );
      },
      (error:any) => {
        this.errorMessage = 'Failed to join the group or already a member.';
        this.successMessage = ''; // Clear success message if error
      }
    );
  }

  // Unjoin Group Function
  onUnjoinGroup(groupId: string): void {
    this.groupService.unjoinGroup(groupId, this.loggedInUserId).subscribe(
      (group) => {
        this.successMessage = 'Successfully left the group!';
        this.errorMessage = ''; // Clear error message if successful

        // Update the group data locally
        this.publicGroups$ = this.publicGroups$!.pipe(
          map(groups => {
            return groups.map((group:any) => ({
              ...group,
              isMember: group.id === groupId ? false : group.isMember
            }));
          })
        );
      },
      (error:any) => {
        this.errorMessage = 'Failed to leave the group.';
        this.successMessage = ''; // Clear success message if error
      }
    );
  }

  isAlreadyMember(group: any): boolean {
    return group.isMember;
  }

  openChat(groupId: string): void {
    this.router.navigate(['/chat', groupId]);
  }
}
