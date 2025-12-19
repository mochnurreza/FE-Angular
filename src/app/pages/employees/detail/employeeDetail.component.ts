import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employee } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';
import { toast } from '../../../shared/utils/toast';

@Component({
  selector: 'employee-detail',
  standalone: true,
  templateUrl: './employeeDetail.component.html',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class EmployeeDetail implements OnInit {
  employee?: Employee;
  form!: FormGroup;

  isEditMode = false;
  groups: string[] = [];
  private username!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.groups = this.employeeService.getGroups();

    const employee = this.employeeService.getEmployee(this.username);
    if (!employee) {
      this.router.navigate(['/employees']);
      return;
    }
    this.employee = employee;
    this.form = this.fb.group({
      username: [{ value: employee.username, disabled: true }],
      firstName: [employee.firstName, Validators.required],
      lastName: [employee.lastName, Validators.required],
      email: [employee.email, [Validators.required, Validators.email]],
      birthDate: [employee.birthDate, Validators.required],
      basicSalary: [employee.basicSalary, Validators.required],
      status: [employee.status, Validators.required],
      group: [employee.group, Validators.required],
      description: [employee.description],
    });
  }

  enableEdit(): void {
    this.isEditMode = true;
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.form.patchValue(this.employee!);
  }

  save(): void {
    if (this.form.invalid) {
      toast.fire({
        icon: 'error',
        title: 'Invalid data, please check again',
      });
      return;
    }

    const updated = {
      ...this.employee!,
      ...this.form.getRawValue(),
    };

    this.employeeService.updateEmployee(this.username, updated);
    toast.fire({
      icon: 'success',
      title: 'Employee updated successfully',
    });
    this.employee = updated;
    this.isEditMode = false;
  }
  back(): void {
    this.router.navigate(['/employees'], {
      queryParamsHandling: 'preserve',
    });
  }
}
