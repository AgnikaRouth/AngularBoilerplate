import {
  Directive,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ContentChild,
} from '@angular/core';
import { FormGroup, NgForm, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appTrackFormChanges]',
  exportAs: 'tracker',
  standalone: true,
})
export class TrackFormChangesDirective implements OnInit, OnDestroy {
  @Input() trackGroup!: FormGroup;
  @Output() formReset: EventEmitter<void> = new EventEmitter<void>();

  private initialValue: any;
  private sub!: Subscription;

  ngOnInit(): void {
    if (!this.trackGroup) {
      console.warn('trackGroup (FormGroup) input is required');
      return;
    }
    this.initialValue = this.trackGroup.getRawValue();
  }

  public resetForm() {
    if (!this.trackGroup) return;

    this.trackGroup.reset(this.initialValue);
    this.formReset.emit();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
