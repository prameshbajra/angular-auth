import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            name: '',
            email: '',
            password: ''
        });
    }

    submit(): void {
        const registerData = this.registerForm?.getRawValue();
        this.http.post('http://localhost:8000/api/register', registerData).subscribe(response => {
            this.router.navigate(['/login']);
        });
    }

}
