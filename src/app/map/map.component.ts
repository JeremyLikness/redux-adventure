import { Component, Input } from '@angular/core';
import { Room } from '../world/room';
import { CellComponent } from '../cell';
import { GRID_SIZE } from '../settings';

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
      for (let northToSouth = 0; northToSouth < GRID_SIZE; northToSouth += 1) {
        let row: Room[] = [];
        for (let westToEast = 0; westToEast < GRID_SIZE; westToEast += 1) {
          let idx = northToSouth * GRID_SIZE + westToEast;
          row.push(val[idx]);
        }
        this.grid.push(row);
      }
    }
  }

  constructor() { }

}
