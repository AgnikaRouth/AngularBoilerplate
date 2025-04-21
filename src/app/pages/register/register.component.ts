import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TrackFormChangesDirective } from 'src/app/shared/directives/track-form-changes.directive';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    RouterModule,
    TrackFormChangesDirective,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  profileForm: FormGroup;
  isDirty: boolean = false;
  @Input() trackGroup!: FormGroup;

  @ViewChild(TrackFormChangesDirective) tracker!: TrackFormChangesDirective;
  saved: boolean = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      email: ['user@example.com'],
      username: ['myuser'],
    });
  }

  onDirty(dirty: boolean) {
    this.isDirty = dirty;
  }

  onReset() {
    console.log('Form reset triggered.');
  }

  manualReset() {
    this.tracker.resetForm();
  }

  save() {
    if (this.profileForm.dirty) {
      console.log('Saving:', this.profileForm.value);
      this.profileForm.markAsPristine();
    }
    this.saved = true;
    setTimeout(() => {
      this.saved = false;
    }, 3000);
  }
}
