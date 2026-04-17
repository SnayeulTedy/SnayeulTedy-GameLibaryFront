import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeStatsModel } from '../models/home-stats.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  private httpClient = inject(HttpClient)

  private baseUrl = "http://localhost:5120/api/home"

  getStats() : Observable<HomeStatsModel> {
    return this.httpClient.get<HomeStatsModel>(this.baseUrl + "/stats");
    // return this.httpClient.get<HomeStatsModel>(`${this.baseUrl}/stats`);
  }
}
