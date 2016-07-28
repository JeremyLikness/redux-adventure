import { Component, Input } from '@angular/core';
import { Room } from '../world/room';
import { CellComponent } from '../cell';

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  directives: [CellComponent]
})
export class MapComponent {

  public grid: Room[][] = []; 

  @Input('currentRoom')
  public currentRoom: Room; 

  @Input('rooms')
  public set rooms(val: Room[]) {
    if (val && val.length > 0) {
      this.grid = []; 
      for (let northToSouth = 0; northToSouth < 10; northToSouth += 1) {
        let row: Room[] = [];
        for (let westToEast = 0; westToEast < 10; westToEast += 1) {
          let idx = northToSouth * 10 + westToEast;
          row.push(val[idx]);
        }
        this.grid.push(row);
      }
    }
  }

  constructor() { }

}
