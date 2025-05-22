
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from '../group.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  createGroupForm!: FormGroup;
  loggedInUserId !: string; // Replace with real authentication
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createGroupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(200)],
      isPublic: [true]
    });
  }

  onCreateGroupSubmit(): void {
    if (this.createGroupForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.authService.getUserData().subscribe({
      next: (user) => {
        this.loggedInUserId = user._id;
      },  
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.errorMessage = 'Failed to fetch user data.';
      }
    });
    this.groupService.createGroup(
      this.createGroupForm.value,
      this.loggedInUserId
    ).subscribe({
      next: (newGroup) => {
        this.successMessage = 'Group created successfully!';
        setTimeout(() => {
          this.router.navigate(['/join-group']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = 'Failed to create the group. Please try again!';
        console.error('Error creating group:', error);
      },
      complete: () => {
        this.isLoading = false;
        this.createGroupForm.reset({ isPublic: true });
      }
    });
  }

  // Delete Group (if needed)
  onDeleteGroup(groupId: string): void {
    this.groupService.deleteGroup(groupId, this.loggedInUserId).subscribe(
      () => {
        this.successMessage = 'Group deleted!';
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = 'Deletion failed: Only the creator can delete.';
      }
    );
  }
}
