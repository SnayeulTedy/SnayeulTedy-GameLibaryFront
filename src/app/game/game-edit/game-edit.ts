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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Game } from '../../models/game.interface';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-edit',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatInputModule,
    CommonModule,
    MatSliderModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  templateUrl: './game-edit.html',
  styleUrl: './game-edit.css',
})
export class GameEdit {
  private gameService = inject(GameService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public gameUuid: string = "";
  public gameTypes: string[] = ["RPG", "FPS", "Adventure", "Strategy", "Simulation", "Sports", "Action Adventure", "Action RPG", "MMORPG", "FPS", "Survival Horror", "Horror"];

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    completed: new FormControl(false, [Validators.required]),
    completionRate: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    imgUrl: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
   this.route.params.subscribe((params) => {
    this.gameUuid = params['uuid'];
    this.gameService.getByUuid(this.gameUuid).subscribe({
      next : (response) => {
        this.form.patchValue(response);
      }
    });
   });
  }

  onSubmit() {
    if(!this.form.invalid) {
      this.gameService.put(this.gameUuid, this.form.value as Game).subscribe({
        next: (res) => {
          this.router.navigate(["/games"]);
        }
      });
    }
  }

  onDelete() {
    this.gameService.delete(this.gameUuid).subscribe({
      next: (res) => {
        this.router.navigate(["/games"]);
      }
    });
  }
}
