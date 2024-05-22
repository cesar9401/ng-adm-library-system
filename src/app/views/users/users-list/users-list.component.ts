import { Component, OnInit } from '@angular/core';
import { AdmUser } from 'src/app/data/adm.model';
import { SimpleList } from 'src/app/data/simple-list';
import { MessageEnum } from 'src/app/enums/message.enum';
import { AdmUserService } from 'src/app/services/adm/adm-user.service';
import { ToastService } from 'src/app/services/util/toast.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent extends SimpleList implements OnInit {

  users: AdmUser[] = [];

  constructor(
    private userService: AdmUserService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.userService.findAll(this.filters)
      .subscribe({
        next: response => {
          this.users = response.body ?? [];
          this.collectionSize = Number(response.headers.get('X-Total-Count') ?? 0);
        },
        error: _ => this.toastService.showError(MessageEnum.MSG_ERROR_SERVER)
      });
  }
}
