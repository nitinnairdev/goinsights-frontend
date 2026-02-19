import { Component, OnInit, inject, signal } from '@angular/core';
import { InsightsService, InsightData } from '../services/insights.service';
import { CommonModule } from '@angular/common';
import { ChatService } from '../services/chat.service';

interface InsightCard {
  id: string;
  title: string;
  data: InsightData;
  loading: boolean;
}

const defaultInsightData: InsightData = {
  current: 0,
  benchmark: 0,
  delta: 0,
  aiSummary: '',
};

@Component({
  selector: 'app-insights',
  standalone: true, // Assuming standalone based on imports
  imports: [CommonModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.scss',
})
export class InsightsComponent implements OnInit {
  private service = inject(InsightsService);
  private chatService = inject(ChatService);
  public showError = false;
  // Use an array of signals to keep track of cards
  cards = signal<InsightCard[]>([
    { id: 'safety', title: 'Safety', data: defaultInsightData, loading: false },
    { id: 'trips', title: 'Trips', data: defaultInsightData, loading: false },
    { id: 'fuel', title: 'Fuel', data: defaultInsightData, loading: false },
    { id: 'hos', title: 'HOS', data: defaultInsightData, loading: false },
    { id: 'idling', title: 'Idling', data: defaultInsightData, loading: false },
    { id: 'faults', title: 'Faults', data: defaultInsightData, loading: false },
  ]);

  ngOnInit() {
    this.reloadAllCards();
  }

  reloadAllCards() {
    this.cards().forEach((card) => this.fetchInsight(card.id));
  }

  fetchInsight(id: string) {
    // Set individual card loading to true
    this.showError = false;
    this.updateCardState(id, { loading: true });

    this.service.getInsightsByCategory(id).subscribe({
      next: (data) => {
        this.updateCardState(id, { data, loading: false });
      },
      error: () => {
        this.showError = true;
        this.updateCardState(id, { loading: false });
      },
    });
  }

  // Helper to update a single item in the signal array
  private updateCardState(id: string, patch: Partial<InsightCard>) {
    this.cards.update((cards) =>
      cards.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    );
  }

  askAi(card: InsightCard) {
    // Define mapping for specific categories to target the right Geotab entities
    const categorySpecificsPrompts: Record<string, string> = {
      safety: 'How to improve the safety of the fleet?',
      trips: 'How to increase the number of trips?',
      fuel: 'How to reduce the fuel consumption?',
      hos: 'How to reduce the HOS violations?',
      idling: 'How to reduce the idle time?',
      faults: 'How to reduce the engine fault codes?',
    };

    this.chatService.sendMessage(categorySpecificsPrompts[card.id]);
  }
}
