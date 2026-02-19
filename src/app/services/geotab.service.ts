// geotab-context.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GeotabService {
  // Signals to hold Geotab credentials
  public api = signal<any>(null);
  public state = signal<any>(null);
  public credentials = signal<{
    sessionId: string;
    database: string;
    server: string;
  } | null>(null);

  initialize(api: any, state: any) {
    this.api.set(api);
    this.state.set(state);

    // Capture session info to pass to your Railway backend
    api.getSession((session: any) => {
      this.credentials.set({
        sessionId: session.sessionId,
        database: session.database,
        server: session.server,
      });
    });
  }
}
