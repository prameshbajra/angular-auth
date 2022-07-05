import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: '',
            password: ''
        });
    }

    submit(): void {
        console.log(this.loginForm.getRawValue());
    }

}
