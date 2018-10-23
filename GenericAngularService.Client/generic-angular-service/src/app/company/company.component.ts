import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Company } from 'src/app/company/shared/company';
import { CompanyService } from './shared/company.service';
import { Mode } from '../common/mode.enum';
import { CompanyModalComponent } from './company-modal/company-modal.component';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  private selectedCompany: Company = null;

  constructor(private companyService: CompanyService, private modalService: NgbModal) { }

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
      this.clearRowSelection();
    });
  }

  private selectRow(company: Company): void {
    this.selectedCompany = this.rowSelected(company) ? null : company;
  }

  private rowSelected(company: Company): boolean {
    if (this.selectedCompany) {
      return this.selectedCompany.id === company.id;
    }   
  }

  private clearRowSelection(): void {
    this.selectedCompany = null;
  }

  private createCompany(): void {
    this.openModal(null, Mode.add);
  }

  private editCompany(): void {
    if (this.validateCompanySelection()) {
      this.openModal(this.selectedCompany, Mode.edit);
    }
  }

  private deleteCompany(): void {
    if (this.validateCompanySelection() && confirm("Are you sure?")) {
      this.companyService.delete(this.selectedCompany.id).subscribe(() => {
        this.realoadTable();
      });
      this.clearRowSelection();
    }
  }

  private showCompany(): void {
    this.openModal(this.selectedCompany, Mode.readonly);
  }

  private validateCompanySelection(): boolean {
    if (this.selectedCompany === null) {
      alert("Please select company first!");
      return false;
    }

    return true;
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
