import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";


@Injectable({
  providedIn: "root"
})

export class EmployeeService {
  private employee: Employee[] = [];

  private readonly groups = ['IT', 'HR', 'Credit Analyst', 'AO', 'GA', 'FO', 'Compliance', 'Front office', 'RM', 'Treasury'];
  private readonly statuses = ['Active', 'Inactive'];

  constructor() {
    this.dummyData();
  }
  private dummyData(): void {
    this.employee = Array.from({length : 100}).map((_, i) => ({
      username: `user${i + 1}`,
      firstName: `First${i + 1}`,
      lastName: `Last${i + 1}`,
      email: `Email${i + 1}@gmail.com`,
      birthDate: new Date(1990, i % 12, (i % 28) + 1),
      basicSalary: 5000000 + i * 100000,
      status: this.statuses[i % this.statuses.length],
      group: this.groups[i % this.groups.length],
      description: "Dummy employee"
    }));
  }

  getGroups(): string[] {
    return [...this.groups]
  }

  getEmployees(): Employee[] {
    return [...this.employee];
  };

  getEmployee(username: string): Employee | undefined {
    return this.employee.find((n) => n.username === username);
  }

  addEmployee(employee: Employee): void {
    this.employee.unshift(employee);
  }

  updateEmployee(username: string, data:Employee): void {
    const selected = this.employee.findIndex(n => n.username === username);
    if(selected !== 1) {
      this.employee[selected] = {...data}
    }
  }

  deleteEmployee(username:string): void {
    this.employee = this.employee.filter(n => n.username !== username)
  }

  search(name: string, status: string): Employee[] {
    return this.employee.filter(n =>
      (!name || `${n.firstName} ${n.lastName}`.toLowerCase().includes(name.toLowerCase())) &&
      (!status || n.status === status)
    )
  }

  sort(data: Employee[], direction: 'ASC' | 'DESC', field: keyof Employee): Employee[] {
    return [...data].sort((a,b) => {
      const valueA = a[field]
      const valueB = b[field]

      if (typeof valueA === 'number' && typeof valueB === 'number') {
      return direction === 'ASC'
        ? valueA - valueB
        : valueB - valueA;
    }

    return direction === 'ASC' ? String(valueA).localeCompare(String(valueB)) : String(valueB).localeCompare(String(valueA))
    })
  }

  pagination(data: Employee[], page: number, limit: number):Employee[] {
    const start = (page - 1) * limit
    return data.slice(start, start + limit)
  }
}


