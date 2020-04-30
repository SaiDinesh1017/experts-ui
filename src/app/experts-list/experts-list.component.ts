import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpertiseService } from '../shared/expertise/expertise.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-experts-list',
  templateUrl: './experts-list.component.html',
  styleUrls: ['./experts-list.component.css']
})
export class ExpertsListComponent implements OnInit {
  expertform: FormGroup;
  experts: Array<any>;
  listExpertise: string[] = [];
  ELEMENT_DATA: PeriodicElement[] = [];
  constructor(private expertService: ExpertiseService, private fb: FormBuilder) {
    this.expertform = fb.group({
      name: '',
      expert: [],
    });
  }

  displayedColumns: string[] = ['name', 'expert'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
   this.getData();
  }

  onSubmit(val) {
    console.log(val);
    this.expertService.addExpert(val).subscribe((res) => {
      this.getData();
    });
  }

  getData() {
    this.expertService.getAll().subscribe((res) => {

      const expertsPerDomain = res.expertsPerDomain;
      // tslint:disable-next-line:forin
      for (const property in expertsPerDomain) {
        if (expertsPerDomain[property].length > 0) {
          expertsPerDomain[property].forEach(val => {
            this.ELEMENT_DATA.push({name: property, expert: val});
          });
        }
        this.listExpertise.push(property);
      }
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }
}

export interface PeriodicElement {
  name: string;
  expert: string;
}


