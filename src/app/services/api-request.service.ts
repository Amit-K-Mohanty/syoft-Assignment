import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ApiRequestService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  post(url:string,body:any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(url, body, { observe: "response" })
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
}
