import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '@core/models/Company';
import { URL } from '../../../core/constants/url';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  public getAllCompanies() {
    return this.http.get<Company[]>(URL.COMPANIES);
  }

  public getCompany(id: string) {
    return this.http.get(URL.COMPANY + id);
  }

  public modifyCompany(id: string, company: Partial<Company>) {
    return this.http.put(URL.COMPANY + id, company);
  }
}
