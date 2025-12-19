import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employee } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';
import Swal from 'sweetalert2';
import { toast } from '../../../shared/utils/toast';

@Component({
  selector: 'employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employees.component.html',
})
export class EmployeeList implements OnInit {
  employees: Employee[] = [];
  filterEmployees: Employee[] = [];
  paginated: Employee[] = [];

  searchName = '';
  searchStatus = '';
  currentPage = 1;
  limit = 10;
  total = 1;
  sortField: keyof Employee | null = null;
  sortDir: 'ASC' | 'DESC' = 'ASC';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    this.filtered();
  }

  sorting(field: keyof Employee): void {
    if (this.sortField === field) {
      this.sortDir = this.sortDir === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortField = field;
      this.sortDir = 'ASC';
    }
    this.filtered();
  }

  filtered(): void {
    let data = this.employees.filter(
      (p) =>
        (!this.searchName ||
          `${p.firstName} ${p.lastName}`
            .toLowerCase()
            .includes(this.searchName.toLowerCase())) &&
        (!this.searchStatus || p.status === this.searchStatus)
    );

    if (this.sortField && this.sortDir) {
      data = this.employeeService.sort(
        data,
        this.sortDir,
        this.sortField
      );
    }

    this.filterEmployees = data

    this.currentPage = 1;
    this.updatePagination();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        name: this.searchName || null,
        status: this.searchStatus || null,
      },
      queryParamsHandling: 'merge',
    });
  }

  updatePagination(): void {
    this.total = Math.ceil(this.filterEmployees.length / this.limit);
    const start = (this.currentPage - 1) * this.limit;
    this.paginated = this.filterEmployees.slice(start, start + this.limit);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.total) return;
    this.currentPage = page;
    this.updatePagination();
  }

  delete(username: string): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Deleted data cannot be restored',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      this.employeeService.deleteEmployee(username);
      this.employees = this.employeeService.getEmployees();
      toast.fire({
        icon: 'success',
        title: 'Employee deleted'
      });

      this.filtered();
    }
  });
}
}
