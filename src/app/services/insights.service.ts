// insights.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InsightData {
  current: number;
  benchmark: number;
  delta: number;
  aiSummary: string;
}

@Injectable({ providedIn: 'root' })
export class InsightsService {
  private http = inject(HttpClient);

  private getBaseApiUrl(): string {
    const isLocal = window.location.hostname === 'localhost';

    // If local, return '/api' so proxy.conf.json works
    // If in Geotab/Vercel, return the full Vercel URL to break out of Geotab
    return isLocal ? '/api' : 'https://goinsights-frontend.vercel.app/api';
  }

  private apiUrl = 'insights';

  // Fetch data for a specific category (e.g., 'fuel', 'trips', 'safety')
  getInsightsByCategory(category: string): Observable<InsightData> {
    return this.http.get<InsightData>(
      `${this.getBaseApiUrl()}/${this.apiUrl}/${category}`,
    );
  }
}
