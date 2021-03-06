import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpertiseService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('//localhost:8081/get_all_experts');
  }

  addExpert(val: any): Observable<any> {
    return this.http.post('//localhost:8081/experts/add', {...val});
  }
}
