import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Game } from '../models/game.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  http = inject(HttpClient);

  baseUrl = "http://localhost:5120/api";

  get(params?: any): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/games`, { params: params });
  }

  getByUuid(uuid: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/games/${uuid}`);
  }

   post(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/games`, game);
  }

  put(uuid: string, game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.baseUrl}/games/${uuid}`, game);
  }

  delete(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/games/${uuid}`);
  }
}
