import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { InsightsComponent } from './insights/insights.component';
import { ChatComponent } from './chat/chat.component';
import { GeotabService } from './services/geotab.service';

@Component({
  selector: 'app-root',
  imports: [InsightsComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  private geotab = inject(GeotabService);

  ngOnInit() {
    // 1. Handle the case where Geotab finishes AFTER Angular loads
    window.addEventListener('geotabReady', (event: any) => {
      this.initGeotab(event.detail.api, event.detail.state);
    });

    // 2. Handle the case where Geotab finished BEFORE Angular loaded
    const win = window as any; // Cast to any
    if (win.geotabApi && win.geotabState) {
      this.initGeotab(win.geotabApi, win.geotabState);
    }
  }

  private initGeotab(api: any, state: any) {
    console.log('Geotab initialized successfully');
    this.geotab.initialize(api, state);
  }
}
