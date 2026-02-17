import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InsightsComponent } from './insights/insights.component';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  imports: [InsightsComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}
