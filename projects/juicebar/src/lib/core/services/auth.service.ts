// core/services/auth.service.ts
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {User} from '../models/user.model';
import {Router} from '@angular/router';
import {ConfigService} from './config.service';

interface LoginResponse {
  // adjust based on your backend response
  token?: string;

  // other fields...
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private router: Router
  ) {
    this.apiUrl = this.config.get('apiUrl');
  }

  checkAuthStatus(): Observable<boolean> {
    this.isLoadingSubject.next(true);
    const token = localStorage.getItem('token');

    if (!token) {
      this.isLoadingSubject.next(false);
      this.isAuthenticatedSubject.next(false);
      return of(false);
    }

    // Verify token by getting user info
    return this.getUserInfo().pipe(
      map(user => {
        console.log(user);
        this.isLoadingSubject.next(false);
        const isAuthenticated = !!user;
        this.isAuthenticatedSubject.next(isAuthenticated);
        console.log(isAuthenticated);
        return isAuthenticated;
      }),
      catchError((error: HttpErrorResponse) => {
        // Only logout if it's an authentication error (401)
        if (error.status === 401) {
          this.logout();
        }
        return of(false);
      })
    );
  }

  getUserInfo(): Observable<User> {
    const body: any = {
      'service': 'juicebox',
      'method': 'getJuiceboxUser',
      'params': []
    };

    return this.http.post<User>(`${this.apiUrl}/gateway`, body).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  login(username: string, password: string) {
    const body: any = {
      'service': 'juicebox:authentication:service',
      'method': 'auth',
      'params': ["juicebox:user", null, {
        email: username,
        password: password
      }, {}]
    };

    return this.http.post<LoginResponse>(`${this.apiUrl}/gateway`, body)
      .pipe(
        tap(data => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }


}
