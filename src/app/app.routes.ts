import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { EmployeeList } from './pages/employees/listEmployees/employees.component';
import { AddEmployee } from './pages/employees/addEmployee/addEmployee.component';
import { EmployeeDetail } from './pages/employees/detail/employeeDetail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'employees',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: EmployeeList
      },
      {
        path: 'add',
        component: AddEmployee
      },
      {
        path: ':username',
        component: EmployeeDetail
      }
    ]
  }
];
