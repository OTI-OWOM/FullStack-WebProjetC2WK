import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/interfaces/Users';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss']
})
export class UserDisplayComponent {
  @Input() data: Partial<User> = {} as User;
  @Input() userID: string = '';
}
