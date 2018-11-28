import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { PromisesGrid } from 'app/model/promisesgrid';

@Injectable({
  providedIn: 'root'
})
export class WorkFlowService {

  constructor(private http: Http) { }

  loadPromises(page: number, offset: number) {
    let token = sessionStorage.getItem("token");

    console.log("http://localhost:8088/getAllPromises/" + token + "/" + page + "/" + offset);

    return this.http.get("http://localhost:8088/getAllPromises/" + token + "/" + page + "/" + offset);
  }

  getPaginatorLength() {
    let token = sessionStorage.getItem("token");
    return this.http.get("http://localhost:8088/getPaginatorLength/" + token);
  }

  addPromise(promise: PromisesGrid) {
    let token = sessionStorage.getItem("token");
    return this.http.post("http://localhost:8088/addpromise/" + token, promise);
  }

  settle(promise: PromisesGrid) {
    let token = sessionStorage.getItem("token");
    return this.http.post("http://localhost:8088/settlepromise/" + token, promise);

  }
}
