import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('fadeInAnimation', [
      state('void', style({ opacity: 0 })), // Initial state
      transition(':enter', [animate('500ms ease-in')]), // Entering animation
      transition(':leave', [animate('500ms ease-out')]), // Leaving animation
    ]),
  ],
})
export class LoginComponent {
  animationState = true;

  toggleAnimation() {
    this.animationState = !this.animationState;
  }
}
