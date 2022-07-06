import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    message: string = '';

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        this.http.get('http://localhost:8000/api/user', { withCredentials: true }).subscribe((response: any) => {
            this.message = `Heyyyy ${response.name}`;
        }, (err => {
            this.router.navigate(['/login']);
        }));
    }

    logout(): void {
        this.http.post('http://localhost:8000/api/logout', {}, { withCredentials: true }).subscribe((response: any) => {
            this.message = `You are not logged in.`;
            this.router.navigate(['/login']);
        }, (err => {
            console.log(err);
        }));
    }

}
