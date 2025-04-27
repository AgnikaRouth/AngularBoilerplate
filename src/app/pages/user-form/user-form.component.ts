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
  submittedData: any = null;

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
      skills: this.fb.array([this.fb.control('')]),
      certificates: this.fb.array([this.fb.control('')]),
    });
  }

  // hobbies
  get hobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  addHobby() {
    this.hobbies.push(this.fb.control(''));
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  // skills

  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control(''));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // certificates

  get certificates(): FormArray {
    return this.userForm.get('certificates') as FormArray;
  }
  addCertificate() {
    this.certificates.push(this.fb.control(''));
  }

  removeCertificate(index: number) {
    this.certificates.removeAt(index);
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.submittedData = this.userForm.value;
      // this.userForm.reset();
      // this.hobbies.clear();
      // this.hobbies.push(this.fb.control(''));
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
