import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';
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
        private usersService: UsersService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.paramID = this.route.snapshot.paramMap.get('id') ?? '';
    }

    userDelete(): void {
        this.subscription.add(
            this.usersService
                .deleteUser(
                    this.paramID,
                )
                .subscribe((res: any) => {
                    if (res) {
                        this.message = res.message;
                        delay(2000);
                        this.router.navigateByUrl('logout');
                    }
                }),
        );
    }
}
