import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentInquiryService {

  constructor(private http:Http) { }

  getAgentsToView(token,page,offset){
    return this.http.get("http://localhost:8088/agentInquiry/getlist/"+token+"/"+page+"/"+offset);
  }

  getAgentsToViewCount(token){
    return this.http.get("http://localhost:8088/agentInquiry/getlistCount/"+token);
  }

  getFullAgentDetails(agentCode){
    return this.http.get("http://localhost:8088/agentInquiry/getAgentDetails/"+agentCode);
  }

}
