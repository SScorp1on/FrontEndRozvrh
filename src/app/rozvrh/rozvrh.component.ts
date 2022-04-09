import { Component } from '@angular/core';

@Component({
  selector: 'app-rozvrh',
  templateUrl: './rozvrh.component.html',
  styleUrls: ['./rozvrh.component.css']
})
export class RozvrhComponent{
  displayedColumns: string[] = [];
 // dataSource = ELEMENT_DATA;

  tables = [0];

  constructor() {
    this.displayedColumns.length = 24;
    this.displayedColumns.fill('filler');

    // The first two columns should be position and name; the last two columns: weight, symbol
    this.displayedColumns[0] = 'position';
    this.displayedColumns[1] = 'name';
    this.displayedColumns[22] = 'weight';
    this.displayedColumns[23] = 'symbol';
  }

  /** Whether the button toggle group contains the id as an active value. */
 /* isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
    return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  }
}

*/
}
