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
  private apiUrl = 'api/insights';

  // Fetch data for a specific category (e.g., 'fuel', 'trips', 'safety')
  getInsightsByCategory(category: string): Observable<InsightData> {
    return this.http.get<InsightData>(`${this.apiUrl}/${category}`);
  }
}
