import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../shared/interfaces/Users';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();

    userList!: User[];

    constructor(private user_service: UsersService) { }

    ngOnInit(): void {
        this.user_service.getAllUsers().subscribe((response: User[]) => {
            this.userList = response;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
