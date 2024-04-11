import { Component } from '@angular/core';
import { LoginRequest } from './models/login-request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model: LoginRequest
  constructor(private service:AuthService,private cookieService:CookieService,private router:Router) {
    this.model = {
      email: '',
      password: '',
    }
  }
  onLoginSubmit(): void {
    this.service.login(this.model).subscribe({next:(res)=>{
      this.cookieService.set('Authorization', `Bearer ${res.token}`,
      undefined, '/', undefined, true, 'Strict');
      this.service.setUser({
        email: res.email,
        roles: res.roles
      });
      this.router.navigateByUrl('/');
      
    }})

  }
}
