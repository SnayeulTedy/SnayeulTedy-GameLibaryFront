import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game.interface';
  
@Component({
  selector: 'app-game-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatProgressBarModule,
    RouterLink
  ],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
})
export class GameList implements OnInit, AfterViewInit {
  private gameService = inject(GameService);

  public games = signal<Game[]>([]);
  public searchValue: string = "";
  public displayedColumns: string[] = ['img', 'name', 'type', 'publisher', 'completion-rate', 'completed', 'actions'];
  dataSource = new MatTableDataSource<Game>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {

    this.gameService.get().subscribe((data: Game[]) => {
      this.games.set(data);
      this.dataSource = new MatTableDataSource<Game>(this.games());
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {

  }

  onSearchChanged() {
    this.gameService.get({ search: this.searchValue }).subscribe({
      next: (games) => {
        this.games.set(games);
        this.dataSource = new MatTableDataSource<Game>(this.games());
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}
