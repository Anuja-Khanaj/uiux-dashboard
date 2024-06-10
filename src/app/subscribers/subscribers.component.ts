import { Component } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent {
  isLoading:boolean = true;
  isDisplay :boolean = false;
  subscribersArray: any;
  constructor( private subService: SubscribersService) { }
  ngOnInit(): void {
    this.subService.loadData().subscribe(val => {
      console.log("subscriber printing");
      
      console.log(val);
  
    this.subscribersArray = val;
    this.isDisplay = true;
      this.isLoading = false;
    })
}

deleteUser(id){
  this.subService.deleteData(id)
}
}
