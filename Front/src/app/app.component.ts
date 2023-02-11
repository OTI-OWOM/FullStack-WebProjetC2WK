import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    id!: string;

    constructor(public router: Router, private route: ActivatedRoute) {
        if (localStorage.getItem('id')) {
            this.id = localStorage.getItem('id') ?? '';
        }
    }
}
