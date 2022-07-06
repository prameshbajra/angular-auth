import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    message: string = 'You are not logged in';

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        // This does not work ...
        // Backend needs Authorization header with Bearer token ... Not only cookie ...
        this.http.get('http://localhost:8000/api/user', { withCredentials: true }).subscribe(response => {
            console.log(response);
        }, (err => {
            console.log(err);
        }));
    }

}
