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
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    MatStepperModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  userForm: FormGroup;
  faTrash = faTrash;
  faPlus = faPlus;
  submittedData: any = null;
  maxEntries = 5;
  currentStep = 0;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      basicDetails: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
        age: ['', Validators.required],
        gender: ['', Validators.required],
      }),
      hobbies: this.fb.array([this.fb.control('')]),
      skills: this.fb.array([this.fb.control('')]),
      certificates: this.fb.array([this.fb.control('')]),
      terms: [false, Validators.requiredTrue],
    });
  }

  get basicDetails() {
    return this.userForm.get('basicDetails') as FormGroup;
  }
  get hobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  get certificates(): FormArray {
    return this.userForm.get('certificates') as FormArray;
  }

  // Add helper method to get FormArray controls for template
  getFormArrayControls(formArray: FormArray) {
    return formArray.controls;
  }
  // add/remove fields

  addField(field: FormArray) {
    if (field.length < this.maxEntries) {
      field.push(this.fb.control('', Validators.required));
    }
  }

  removeField(field: FormArray, index: number) {
    if (field.length > 1) {
      field.removeAt(index);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.submittedData = this.userForm.value;
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
