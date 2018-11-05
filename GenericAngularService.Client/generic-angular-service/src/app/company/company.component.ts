import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Company } from 'src/app/company/shared/company';
import { CompanyService } from './shared/company.service';
import { Mode } from '../common/mode.enum';
import { CompanyModalComponent } from './company-modal/company-modal.component';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableSelect } from '../common/angular-datatables/data-table-select.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  @ViewChild(DataTableDirective)
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public companies: Company[] = [];
  public dtTrigger = new Subject();

  constructor(private companyService: CompanyService, private modalService: NgbModal, private toastr: ToastrService, public select: DataTableSelect) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      serverSide: true,
      processing: true,
      searchDelay: 500,
      ajax: (dtParameters: any, callback) => {
        this.companyService.getDataTablesData(dtParameters).subscribe(resp => {
          this.companies = resp.data as Company[];

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        }, err => alert(err));
      },
      columns: [
        { data: "id" },
        { data: "name" },
        { data: "industry" },
        {
          data: "founded",
          searchable: false
        }
      ]
    }
  }

  public ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  public ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public realoadTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
      this.select.clearRowSelection();
    });
  }

  public createCompany(): void {
    this.openModal(null, Mode.add);
  }

  public editCompany(): void {
    if (this.select.validateRowSelection()) {
      this.openModal(this.select.selectedItem as Company, Mode.edit);
    }
  }

  public deleteCompany(): void {
    if (this.select.validateRowSelection() && confirm("Are you sure?")) {
      this.companyService.delete(this.select.selectedItem.id).subscribe(() => {
        this.realoadTable();
        this.toastr.success("Success!");
      },
        error => this.toastr.error(error.message));
      this.select.clearRowSelection();
    }
  }

  private showCompany(): void {
    this.openModal(this.select.selectedItem as Company, Mode.readonly)
  }

  private openModal(company: Company, mode: Mode): void {
    const modalReference = this.modalService.open(CompanyModalComponent);
    modalReference.componentInstance.companyToEdit = company;
    modalReference.componentInstance.mode = mode;

    modalReference.result.then((result) => {
      if (result === "save") {
        this.realoadTable();
        this.toastr.success("Success!");
      }
    }).catch((error) => {
      this.toastr.error(error);
    });
  }
}
