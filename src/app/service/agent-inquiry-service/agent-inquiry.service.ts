import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentInquiryService {
  getCount(Equality: any, Column: any, Data: any): any {
    throw new Error("Method not implemented.");
  }

  constructor(private http:Http) { }

  getAgentsToView(equality: string, column: string, data: string,token,page,offset){
    return this.http.get("http://localhost:8088/agentInquiry/getlist/"+token+"/"+page+"/"+offset+"/"+equality+"/"+column+"/"+data);
  }

  getAgentsToViewCount(equality: string, column: string, data: string,token){
    return this.http.get("http://localhost:8088/agentInquiry/getlistCount/"+token+"/"+equality+"/"+column+"/"+data);
  }

  getFullAgentDetails(agentCode){
    return this.http.get("http://localhost:8088/agentInquiry/getAgentDetails/"+agentCode);
  }

}
