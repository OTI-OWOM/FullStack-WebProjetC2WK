import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';

@Component({
    selector: 'app-delete-user',
    templateUrl: './delete-user.component.html',
    styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent {
    subscription: Subscription = new Subscription();

    message!: Object;

    paramID!: string;

    constructor(
        private user_service: UsersService,
        private route: ActivatedRoute,
    ) {
        this.paramID = this.route.snapshot.paramMap.get('id') ?? '';
    }

    userDelete(): void {
        this.subscription.add(
            this.user_service
                .deleteUser(
                    localStorage.getItem('token') ?? '',
                    this.paramID,
                )
                .subscribe((res: any) => {
                    if (res) {
                        this.message = res.message;
                    }
                }),
        );
    }
}
