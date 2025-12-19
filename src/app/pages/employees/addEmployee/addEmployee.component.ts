import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../../../core/models/employee.model';
import { maxDateToday } from '../../../core/validator/date.validator';
import { toast } from '../../../shared/utils/toast';

@Component({
  selector: 'add-employee',
  standalone: true,
  templateUrl: './addEmployee.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddEmployee {
  form!: FormGroup;
  groups: string[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.groups = this.employeeService.getGroups();

    this.form = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required, maxDateToday],
      basicSalary: [0, Validators.required],
      status: ['Active', Validators.required],
      group: ['', Validators.required],
      description: [''],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      toast.fire({
        icon: 'error',
        title: 'Please fill all required fields',
      });
      return;
    }
    this.employeeService.addEmployee(this.form.value);
    toast.fire({
      icon: 'success',
      title: 'Employee successfully added',
    });
    this.router.navigate(['/employees']);
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
