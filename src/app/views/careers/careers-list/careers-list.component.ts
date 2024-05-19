import { Component, OnInit } from '@angular/core';
import { AdmCareer } from 'src/app/data/adm.model';
import { SimpleList } from 'src/app/data/simple-list';
import { MessageEnum } from 'src/app/enums/message.enum';
import { AdmCareerService } from 'src/app/services/adm/adm-career.service';
import { ToastService } from 'src/app/services/util/toast.service';

@Component({
  selector: 'app-careers-list',
  templateUrl: './careers-list.component.html',
  styleUrls: ['./careers-list.component.scss']
})
export class CareersListComponent extends SimpleList implements OnInit {

  careers: AdmCareer[] = [];

  constructor(
    private careerService: AdmCareerService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.findAll();
  }

  override findAll(): void {
    this.careerService.findAll(this.filters).subscribe({
      next: response => {
        this.careers = response.body ?? [];
        this.collectionSize = Number(response.headers.get('X-Total-Count') ?? 0);
      },
      error: _ => this.toastService.showError(MessageEnum.MSG_ERROR_SERVER)
    });
  }
}
