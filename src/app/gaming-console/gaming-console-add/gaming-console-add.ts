import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeviceService } from '../../services/device.service';
import { Router, RouterLink } from '@angular/router';
import { Device } from '../../models/device.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-gaming-console-add',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatInputModule,
    CommonModule
],
  templateUrl: './gaming-console-add.html',
  styleUrl: './gaming-console-add.css',
})
export class GamingConsoleAdd {

  private deviceService = inject(DeviceService);
  private router = inject(Router);

  public form = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    constructor: new FormControl<string>('', [Validators.required]),
    releaseYear: new FormControl<number>(2020, [Validators.required, Validators.min(1970), Validators.max(new Date().getFullYear())]),
    powerTFlops: new FormControl<number>(1, [Validators.required]),
    imgUrl: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', []),
  });

  onSubmit(){
    if (this.form.valid) {
      this.deviceService.post(this.form.value as Device).subscribe({
        next: (response) => {
          console.log("Device added successfully", response);
          this.router.navigate(["/","consoles"]);
        }
      });
    }
  
  }
}
