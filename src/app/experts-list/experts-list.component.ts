import { Component, OnInit } from '@angular/core';
import { ExpertiseService } from '../shared/expertise/expertise.service';

@Component({
  selector: 'app-experts-list',
  templateUrl: './experts-list.component.html',
  styleUrls: ['./experts-list.component.css']
})
export class ExpertsListComponent implements OnInit {
  experts: Array<any>;
  constructor(private expertService: ExpertiseService) { }

  ngOnInit() {
    this.expertService.getAll().subscribe(data => {
      this.experts = data;
    });
  }

}
