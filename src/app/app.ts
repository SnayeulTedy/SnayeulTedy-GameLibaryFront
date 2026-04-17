import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GamingConsoleList } from "./gaming-console/gaming-console-list/gaming-console-list";
import { GamingConsoleAdd } from "./gaming-console/gaming-console-add/gaming-console-add";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    GamingConsoleList,
    GamingConsoleAdd,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly router = inject(Router);
  protected readonly title = signal('GameLibFront');

  onHomeClick() {
    this.router.navigate(['/']);
  }
  
}
