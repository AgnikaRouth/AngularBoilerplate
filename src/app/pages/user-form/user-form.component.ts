import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  userForm: FormGroup;
  faTrash = faTrash;
  faPlus = faPlus;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      age: this.fb.control('', [Validators.required, Validators.min(0)]),
      gender: this.fb.control('', Validators.required),
      agreeToTerms: this.fb.control(false, Validators.requiredTrue),
      hobbies: this.fb.array([this.fb.control('')]),
    });
  }

  get hobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  addHobby() {
    this.hobbies.push(this.fb.control(''));
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
