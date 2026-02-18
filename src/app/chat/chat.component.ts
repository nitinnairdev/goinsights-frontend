import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { KeyValue, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, KeyValuePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  prompt = '';
  constructor(public chatService: ChatService) {}

  // This prevents the keyvalue pipe from re-sorting your columns
  keepOrder = (a: KeyValue<string, any>, b: KeyValue<string, any>): number => 0;

  send() {
    if (!this.prompt.trim()) return;
    this.chatService.sendMessage(this.prompt);
    this.prompt = '';
  }
}
