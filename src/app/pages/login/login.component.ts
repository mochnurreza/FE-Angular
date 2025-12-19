import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})

export class LoginComponent{
  form: FormGroup
  errorMessage= ''

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submit(): void {
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return
    }
    const {username, password} = this.form.value
    const success = this.authService.login(username, password)

    if(success){
      this.router.navigate(['/employees'])
    } else {
      this.errorMessage = 'Invalid username or password'
    }
  }
}
