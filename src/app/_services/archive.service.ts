import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataResponseObject } from 'src/app/model/DataResponseObject';
import { Archive  } from 'src/app/model/archive';

const AUTH_API = 'http://localhost:8055/archive';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http: HttpClient) { }
  
  addFormationToArchive(data: any,formation_id:any): Observable<DataResponseObject<Archive>> {
    return this.http.post<DataResponseObject<Archive>>(AUTH_API + `/add/${formation_id}` , data);
  }
  getAll(): Observable<DataResponseObject<Archive>> {
    return this.http.get<DataResponseObject<Archive>>(AUTH_API +`/`);
  }
}
