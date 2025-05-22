import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatForm!: FormGroup;
  groupId: string | null = null;
  messages: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  name:string | null="";
  userName:string ="";

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
     
      return;
    }
    
    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('id');
      
      if (this.groupId) {
        this.loadMessages();
      }
    });

    this.initializeForm();
  }

  initializeForm(): void {
    this.chatForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  loadMessages(): void {
    if (!this.groupId) return;

    this.groupService.getGroupMessages(this.groupId).subscribe({
      next: (messages) => {
        // console.log("messages" + messages);
        console.log(this.messages)
        this.messages = messages;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load messages. Please try again!';
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        }
        console.error('Error loading messages:', error);
      }
    });

    this.groupService.getGroupById(this.groupId).subscribe({
      next :(data)=>{
        this.name=data.name;
        //console.log(this.name)
      }
    })
  }

  onSendMessage(): void {
    if (this.chatForm.invalid || this.groupId === null) return;


    this.authService.getUserData().subscribe(data=>{
      this.userName=data.username
      console.log("uudfufdufdufdufud"+this.userName)
    })


    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = ''; // Reset successMessage

    const message = {
      content: this.chatForm.value.content,
      userId: this.authService.getToken()
    };

    console.log('Sending message:', message); // Debug log

    this.groupService.sendMessage(this.groupId, message).subscribe({
      next: (response) => {
        console.log('Message sent successfully:', response);
        this.messages.push(response.group.messages[response.group.messages.length - 1]);
        this.chatForm.reset();
        this.successMessage = 'Message sent successfully!'; // Set successMessage
        setTimeout(() => {
          this.successMessage = ''; // Clear successMessage after 3 seconds
        }, 3000);
      },
      error: (error) => {
        this.errorMessage = 'Error sending message: HttpErrorResponse';
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        }
        console.error('Error sending message:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}

