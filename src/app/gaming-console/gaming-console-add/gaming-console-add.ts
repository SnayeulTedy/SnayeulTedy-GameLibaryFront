import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeviceService } from '../../services/device.service';
import { Router, RouterLink } from '@angular/router';
import { Device } from '../../models/device.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-gaming-console-add',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
],
  templateUrl: './gaming-console-add.html',
  styleUrl: './gaming-console-add.css',
})
export class GamingConsoleAdd {

  private router = inject(Router);
  private deviceService = inject(DeviceService);

  public form = new FormGroup({
    name: new FormControl<string>("", [Validators.minLength(3), Validators.maxLength(50), Validators.required]),
    constructor: new FormControl<string>("", [Validators.required]),
    powerTFlops: new FormControl<number>(1, [Validators.required]),
    releaseYear: new FormControl<number>(new Date().getFullYear(), [Validators.required, Validators.min(1970), Validators.max(new Date().getFullYear())]),
    imgUrl: new FormControl<string>("", [Validators.required]),
    description: new FormControl<string>("", [Validators.required]),
  });

  onSubmit() {
    if (!this.form.invalid) {
      this.deviceService.post(this.form.value as Device).subscribe({
        next: (device) => {
          console.log("Device added successfully", device);
          this.router.navigate(["/", "consoles"]);
        },
        error: (err) => {
          console.error("Error adding device", err);
        }
      });
    }
  }
}
