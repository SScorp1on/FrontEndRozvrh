import { Component, OnInit } from '@angular/core';
import {TimeblockModel} from "../../admin-dashboard/components/models/timeblock.model";
import {TimeblockService} from "../../admin-dashboard/components/services/timeblock.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  timeblocks: TimeblockModel[] = []
  selected = new FormControl(0);
  constructor(private service: TimeblockService) {
    this.timeblocks = this.timeblocks.slice();
    this.service.getTimeblocks().subscribe(t => {
      this.timeblocks = t
      console.log(this.timeblocks)
    })
  }

  ngOnInit(): void {
  }

}
