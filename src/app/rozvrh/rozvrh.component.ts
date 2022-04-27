import {Component} from '@angular/core';
import {TimeblockModel} from "../admin-dashboard/components/models/timeblock.model";
import {TimeblockService} from "../admin-dashboard/components/services/timeblock.service";



@Component({
  selector: 'app-rozvrh',
  templateUrl: './rozvrh.component.html',
  styleUrls: ['./rozvrh.component.css']
})
export class RozvrhComponent {

timeblocks: TimeblockModel[] = []

  constructor(private service: TimeblockService) {
    this.timeblocks = this.timeblocks.slice();
    this.service.getTimeblocks().subscribe(t => {
      this.timeblocks = t
      console.log(this.timeblocks)
    })
  }
  filteredDays(){

}


}
