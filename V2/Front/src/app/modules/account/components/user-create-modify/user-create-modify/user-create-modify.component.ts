import { Component, Input } from '@angular/core';
import { User } from '@core/models/Users';

@Component({
  selector: 'app-user-create-modify',
  templateUrl: './user-create-modify.component.html',
  styleUrls: ['./user-create-modify.component.scss']
})
export class UserCreateModifyComponent {
  @Input() data: Partial<User> = {} as User;
}
