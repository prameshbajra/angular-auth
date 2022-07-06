import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: '',
            password: ''
        });
    }

    submit(): void {
        this.http.post('http://localhost:8000/api/login', this.loginForm.getRawValue(), { withCredentials: true })
            .subscribe((response: any) => {
                AuthInterceptor.accessToken = response.token;
                this.router.navigate(['/']);
            });
    }

}
