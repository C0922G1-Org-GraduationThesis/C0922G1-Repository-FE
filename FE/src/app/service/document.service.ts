import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DocumentDto} from '../dto/document-dto';
import {Document} from '../model/document';
const DOCUMENT = 'http://localhost:8080/api/document'
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient:HttpClient ) { }

  getAllDocumentDto(documentName: string, page: number): Observable<DocumentDto[]> {
    return this.httpClient.get<DocumentDto[]>(DOCUMENT + `?keySearch1=` + documentName + `&page=` + page)
  }


  findByIdDocumentDto(id: number): Observable<DocumentDto> {
    return this.httpClient.get<DocumentDto>("http://localhost:8080/api/document/info/" + id);
  }

  deleteDocument(id: number): Observable<any> {
    return this.httpClient.delete<Document>('http://localhost:8080/api/document/delete/'+id);
  }

  addDocument(document: Document): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/document/create-document',document)
  }

}
