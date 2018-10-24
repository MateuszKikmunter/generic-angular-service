import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Company } from 'src/app/company/shared/company';
import { CompanyService } from './shared/company.service';
import { Mode } from '../common/mode.enum';
import { CompanyModalComponent } from './company-modal/company-modal.component';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableSelect } from './../common/data-table-select.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  @ViewChild(DataTableDirective)
  private dtElement: DataTableDirective;
  private dtOptions: DataTables.Settings = {};
  private companies: Company[] = [];
  private dtTrigger = new Subject();

  constructor(private companyService: CompanyService, private select: DataTableSelect, private modalService: NgbModal) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      serverSide: true,
      processing: true,
      searchDelay: 500,
      ajax: (dataTablesParameters: any, callback) => {
        this.companyService.getDataTablesData(dataTablesParameters).subscribe(resp => {
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

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  realoadTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
      this.select.clearRowSelection();
    });
  }

  private rowSelected(company: Company): boolean {
    return this.select.rowSelected(company, "id");  
  }

  private createCompany(): void {
    this.openModal(null, Mode.add);
  }

  private editCompany(): void {
    if (this.select.validateRowSelection()) {
      this.openModal(this.select.currentRow(), Mode.edit);
    }
  }

  private deleteCompany(): void {
    if (this.select.validateRowSelection() && confirm("Are you sure?")) {
      this.companyService.delete(this.select.currentRow().id).subscribe(() => {
        this.realoadTable();
      });
      this.select.clearRowSelection();
    }
  }

  private showCompany(): void {
    this.openModal(this.select.currentRow(), Mode.readonly)
  }

  private openModal(company: Company, mode: Mode): void {
    const modalReference = this.modalService.open(CompanyModalComponent);
    modalReference.componentInstance.companyToEdit = company;
    modalReference.componentInstance.mode = mode;

    modalReference.result.then((result) => {
      if (result === "save") {
        this.realoadTable();
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}
