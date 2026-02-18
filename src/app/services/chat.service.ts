// ace-chat.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ChatMessage {
  sender: 'user' | 'ace';
  text: string;
  data?: Record<string, any>[]; // Explicitly tells TS this is an array of objects
  columns?: string[];
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  messages = signal<ChatMessage[]>([]);
  // Store the Geotab-provided chatId here
  private activeChatId = signal<string | null>(null);
  loading = signal(false);

  constructor(private http: HttpClient) {}

  startNewChat() {
    this.messages.set([]);
    this.activeChatId.set(null); // Resetting tells Ace to start fresh
  }

  sendMessage(prompt: string) {
    if (this.messages().length >= 15) return;

    this.loading.set(true);
    // Push user message immediately
    this.messages.update((m) => [...m, { sender: 'user', text: prompt }]);

    this.http
      .post('http://localhost:3000/api/ace/chat', {
        prompt,
        chatId: this.activeChatId(), // Send the ID we have (null for first message)
      })
      .subscribe({
        next: (res: any) => {
          // Store the ID returned by Geotab for the next turn
          if (res.chatId) {
            this.activeChatId.set(res.chatId);
          }

          this.messages.update((m) => [
            ...m,
            {
              sender: 'ace',
              // If text is empty, provide a fallback so the bubble isn't invisible
              text:
                res.text ||
                (res.data?.length
                  ? 'Here is the requested data:'
                  : 'No data found'),
              data: res.data,
              columns: res.columns,
            },
          ]);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }
}
