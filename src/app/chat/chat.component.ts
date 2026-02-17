import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  prompt = '';
  constructor(public chatService: ChatService) {}

  send() {
    this.chatService.sendMessage(this.prompt);
  }
}
