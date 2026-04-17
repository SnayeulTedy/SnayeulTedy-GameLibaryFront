import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../models/device.interface';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  
  http = inject(HttpClient);

  baseUrl = "http://localhost:5120/api";  

  // get() : Observable<Device[]> {
  //   return this.http.get<Device[]>(this.baseUrl + "/devices");
  // }

  post(device: Device) : Observable<Device> {
    return this.http.post<Device>(this.baseUrl + "/devices", device);
  }

  get(params?: any): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.baseUrl}/devices`, { params: params });
  }

  getByUuid(uuid: string): Observable<Device> {
    return this.http.get<Device>(`${this.baseUrl}/devices/${uuid}`);
  }

   put(uuid: string, device: Device): Observable<Device> {
    return this.http.put<Device>(`${this.baseUrl}/devices/${uuid}`, device);
  }

  delete(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/devices/${uuid}`);
  }

}
