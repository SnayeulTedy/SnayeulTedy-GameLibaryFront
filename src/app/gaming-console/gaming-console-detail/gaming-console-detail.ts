import { D } from '@angular/cdk/keycodes';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../models/device.interface';

@Component({
  selector: 'app-gaming-console-detail',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  providers: [DeviceService],
  templateUrl: './gaming-console-detail.html',
  styleUrl: './gaming-console-detail.css',
})
export class GamingConsoleDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private deviceService = inject(DeviceService);
  public device = signal<Device | null>(null);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.deviceService.getByUuid(params['uuid']).subscribe({
        next: (data) => {
          this.device.set(data)
        },
      });
    });
  }
}
