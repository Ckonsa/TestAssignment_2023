import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userRole = 'reader';
  title = 'frontend';
  userRoleChange(newUserRole: string): void {
    this.userRole = newUserRole;
  }

}
