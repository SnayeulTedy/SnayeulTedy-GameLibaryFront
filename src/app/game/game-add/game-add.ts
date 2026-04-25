import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { Router, RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game.interface';

@Component({
  selector: 'app-game-add',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule
  ],
  providers: [GameService],
  templateUrl: './game-add.html',
  styleUrl: './game-add.css',
})
export class GameAdd {
  private gameService = inject(GameService);
  private router = inject(Router);

  public gameTypes: string[] = ["RPG", "FPS", "Adventure", "Strategy", "Simulation", "Sports", "Action Adventure", "Action RPG", "MMORPG", "FPS", "Survival Horror", "Horror"];

  public form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    publisher: new FormControl<string>('', [Validators.required]),
    type: new FormControl<string>('', [Validators.required]),
    completed: new FormControl<boolean>(false, [Validators.required]),
    completionRate: new FormControl<number>(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    imgUrl: new FormControl<string>('', [Validators.required]),
  });

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.gameService.post(this.form.value as Game).subscribe({
        next: (response) => {
          this.router.navigate(["/", "games"]);
        },
        error: (err) => {
          console.error("Error adding game", err);
        }
      });
    }
  }
}
