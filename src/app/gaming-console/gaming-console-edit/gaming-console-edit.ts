import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../models/device.interface';

@Component({
  selector: 'app-gaming-console-edit',
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
  templateUrl: './gaming-console-edit.html',
  styleUrl: './gaming-console-edit.css',
})
export class GamingConsoleEdit implements OnInit {
  private deviceService = inject(DeviceService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private consoleUuid : string = "";

  public form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    constructor: new FormControl<string>('', [Validators.required]),
    releaseYear: new FormControl<number>(2020, [Validators.required, Validators.min(1970), Validators.max(new Date().getFullYear())]),
    powerTFlops: new FormControl<number>(1, [Validators.required]),
    imgUrl: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', []),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.consoleUuid = params['uuid'];
      this.deviceService.getByUuid(this.consoleUuid).subscribe({
        next: (response) => {
          this.form.patchValue(response);
        }
      })
    });
  }

  onSubmit() {
    if(!this.form.invalid) {
      this.deviceService.put(this.consoleUuid, this.form.value as Device).subscribe({
        next: (res) => {
          this.router.navigate(["/consoles"]);
        }
      })
    }
  }
}
