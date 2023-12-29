import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../shared/interfaces/Users';

@Component({
    selector: 'app-modify-user',
    templateUrl: './modify-user.component.html',
    styleUrls: ['./modify-user.component.scss'],
})
export class ModifyUserComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();

    message!: string;

    paramID!: string;

    currentUser = {} as Partial<User>;

    constructor(
        private user_service: UsersService,
        private route: ActivatedRoute,
    ) {
        this.paramID = this.route.snapshot.paramMap.get('id') ?? '';
    }

    ngOnInit(): void {
        try {
            this.subscription.add(
                this.user_service
                    .userSelect(sessionStorage.getItem('token') ?? '', this.paramID)
                    .subscribe((res) => {
                        this.currentUser = res;
                    }),
            );
        } catch (error) {
            console.log(`Not logged in ${error}`);
        }
    }

    userModify(username: string, email: string, adresse: string, password: string) {
        if (username && email && adresse) {
            this.subscription.add(
                this.user_service
                    .modifyUser(
                        sessionStorage.getItem('token') ?? '',
                        this.paramID,
                        username,
                        password,
                        email,
                        adresse,
                    )
                    .subscribe((res: any) => {
                        if (res) {
                            this.message = 'User modified!';
                        }
                    }),
            );
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
