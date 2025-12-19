import { AbstractControl, ValidationErrors } from '@angular/forms';

export function maxDateToday(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const selectedDate = new Date(control.value);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return selectedDate > today
    ? { maxDateToday: true }
    : null;
}
