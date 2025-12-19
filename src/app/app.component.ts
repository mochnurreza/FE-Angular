import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {

  showNavbar = true

  constructor(
    private router: Router
  ){
    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd) {
        this.showNavbar = !e.urlAfterRedirects.startsWith('/login')
      }
    })
  }
}
