import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  login(username: string, password: string): boolean {
    if( username === "admin" && password === "password123") {
      localStorage.setItem('isLoggedIn', 'true')
      return true
    }
    return false
  }

  logout(){
    localStorage.removeItem('isLoggedIn')
  }

  isAthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true'
  }
}
