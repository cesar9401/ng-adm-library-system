import { Component } from '@angular/core';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-adm-library-system';

  constructor(private currentUserService: CurrentUserService) {
  }

  get isAuthenticated(): boolean {
    return this.currentUserService.isAuthenticated();
  }
}
