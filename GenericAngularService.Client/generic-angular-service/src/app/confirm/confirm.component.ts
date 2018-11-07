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

  public confirm(): void {
    this.modal.close(Confirmation.YES);
  }

  public reject(): void {
    this.modal.close(Confirmation.NO);
  }
}
