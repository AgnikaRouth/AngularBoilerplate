import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-search-filter',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
})
export class SearchFilterComponent {
  private userService = inject(UserService);

  // SIMPLE SEARCH USING SIGNALS
  items = signal([
    'Angular',
    'React',
    'Vue',
    'Svelte',
    'SolidJS',
    'Ember',
    'Backbone',
  ]);

  searchTerm = signal('');
  filteredItems = computed(() =>
    this.items().filter((item) =>
      item.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  updateSearch(event: Event) {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.searchTerm.set(target.value);
    }
  }

  // SEARCH USERS
  userSearchTerm = signal('');
  filteredUsers = computed(() =>
    this.userService
      .users()
      .filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(this.userSearchTerm().toLowerCase())
      )
  );

  updateUserSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.userSearchTerm.set(target.value);
  }
}
