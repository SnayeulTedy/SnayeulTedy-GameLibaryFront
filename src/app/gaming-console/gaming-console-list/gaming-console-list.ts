import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../models/device.interface';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-gaming-console-list',
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    SlicePipe,
    MatInputModule,

  ],
  providers: [DeviceService],
  
  templateUrl: './gaming-console-list.html',
  styleUrl: './gaming-console-list.css',
})
export class GamingConsoleList implements OnInit {

  private deviceService = inject(DeviceService);

  public devices = signal<Device[]>([]);
  public value = "";

  ngOnInit(): void {
    this.deviceService.get().subscribe({
      next: (devices) => {
        console.log("Devices fetched successfully", devices);
        this.devices.set(devices);
      },
      error: (err) => {
        console.error("Error fetching devices", err);
      }
    });
  }

  onSearchChanged() { 
    this.deviceService.get({ search: this.value }).subscribe({
      next: (devices) => {
        //  console.log("Devices fetched successfully", devices);
        //  console.log("Search value:", this.value);
        this.devices.set(devices);
      }
    });
  }

  onDelete(uuid: string) {
    if (confirm("Are you sure you want to delete this gaming console?")) {
      this.deviceService.delete(uuid).subscribe({
        next: () => {
          console.log("Device deleted successfully");
          this.devices.set(this.devices().filter(device => device.uuid !== uuid));
        },
        error: (err) => {
          console.error("Error deleting device", err);
        }
      });
    }
  }
}
