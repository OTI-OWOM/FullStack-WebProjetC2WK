import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService) {
    console.log('Admin Guard');
  }

  canActivate(): Observable<boolean> {
      return this.authService.isAdmin();
  }
}
