import { Component, OnInit } from '@angular/core';
import {APIService} from '../../@core/service/api.service';
import {APIData, Employee} from '../../@core/service/models/api.data.structure';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-request',
  templateUrl: './template/viewEmployees.component.html',
  styleUrls: ['./template/viewEmployees.component.css'],
 // providers:[APIService]
})
export class viewempComponent implements OnInit {


  requests: any;
  constructor(private apiService:APIService) { }
  private deletedEmail; //Omar

  ngOnInit() {
    this.apiService.getEmployees().subscribe((response: APIData)=>{ //Omar
      console.log(response);                                         //Omar
      this.requests = response.data;  //Omar
    });
}
deleteEmployee(){ 
  
  const offered = <Employee>{};
  
  offered.email = this.deletedEmail;
  
  if(this.deletedEmail != null  ){
  console.log(offered.email);
  this.apiService.deleteEmployee(offered).subscribe((apiresponse: APIData)=>{
  
  //this.tagMessage = apiresponse.msg;
  
  console.log(apiresponse.msg);
  
  },(error: APIData)=>{
  
  
  console.log(error.msg);
  
  })
  
  } else
  console.log('hii');;
  console.log();
 } 
}