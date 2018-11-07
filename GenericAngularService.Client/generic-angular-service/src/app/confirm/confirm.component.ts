import { Component, OnInit } from '@angular/core';

import { Confirmation } from './../common/confirmation.enum';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(private modal: NgbActiveModal) { }

  ngOnInit() { }

  public close(confirmed: boolean): void {
    const closeResult = confirmed ? Confirmation.YES : Confirmation.NO;
    this.modal.close(closeResult);
  }
}
