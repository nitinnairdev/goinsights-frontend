import { Component, OnInit, inject, signal } from '@angular/core';
import { InsightsService, InsightData } from '../services/insights.service';
import { CommonModule } from '@angular/common';

const defaultInsightData: InsightData = {
  current: 0,
  benchmark: 0,
  delta: 0,
  aiSummary: '',
};

@Component({
  selector: 'app-insights',
  imports: [CommonModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.scss',
})
export class InsightsComponent implements OnInit {
  private service = inject(InsightsService);
  safetyInsights = signal<InsightData>(defaultInsightData);
  tripInsights = signal<InsightData>(defaultInsightData);
  idilingInsights = signal<InsightData>(defaultInsightData);
  faultInsights = signal<InsightData>(defaultInsightData);
  fuelInsights = signal<InsightData>(defaultInsightData);
  hOSInsights = signal<InsightData>(defaultInsightData);

  ngOnInit() {
    this.getSafetyInsights();
    this.getTripInsights();
    this.getIdilingInsights();
    this.getFaultInsights();
    this.getFuelInsights();
    this.getHOSInsights();
  }

  getSafetyInsights() {
    this.service.getInsightsByCategory('safety').subscribe((data) => {
      this.safetyInsights.set(data);
    });
  }

  getTripInsights() {
    this.service.getInsightsByCategory('trips').subscribe((data) => {
      this.tripInsights.set(data);
    });
  }

  getIdilingInsights() {
    this.service.getInsightsByCategory('idling').subscribe((data) => {
      this.idilingInsights.set(data);
    });
  }

  getFaultInsights() {
    this.service.getInsightsByCategory('faults').subscribe((data) => {
      this.faultInsights.set(data);
    });
  }

  getFuelInsights() {
    this.service.getInsightsByCategory('fuel').subscribe((data) => {
      this.fuelInsights.set(data);
    });
  }

  getHOSInsights() {
    this.service.getInsightsByCategory('hos').subscribe((data) => {
      this.hOSInsights.set(data);
    });
  }
}
