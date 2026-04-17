import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { HomeStatsModel } from '../../models/home-stats.interface';

@Component({
  selector: 'app-home-stats',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  providers: [
    HomeService
  ],
  templateUrl: './home-stats.html',
  styleUrl: './home-stats.css',
})
export class HomeStats implements OnInit {

  private homeService = inject(HomeService);

  public stats = signal<HomeStatsModel | null>(null);

  ngOnInit(): void {
    this.homeService.getStats().subscribe(stats => {
      this.stats.set(stats);
    });
  }

}
