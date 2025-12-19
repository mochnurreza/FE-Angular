import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";


@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navbar.component.html'
})

export class NavbarComponent {
  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  logout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
