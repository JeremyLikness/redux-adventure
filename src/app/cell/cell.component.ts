import { Component, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Room } from '../world/room';
import {
  NOT_VISITED_COLOR,
  VISITED_COLOR,
  CURRENT_COLOR,
  WALL_COLOR
} from '../settings';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnChanges {

  private div: HTMLDivElement;

  @ViewChild('cellDiv')
  public set cellDiv(val: ElementRef) {
    this.div = val.nativeElement;
    this.processStyle();
  }

  @Input('room')
  public room: Room;

  @Input('isCurrentRoom')
  public isCurrentRoom: boolean;

  constructor() { }

  public ngOnChanges(): void {
    if (this.div && this.room) {
      this.processStyle();
    }
  }

  private processStyle(): void {
    if (!this.room || !this.room.visited) {
      this.div.style.background = NOT_VISITED_COLOR;
      return;
    }
    this.div.style.background = this.isCurrentRoom ? CURRENT_COLOR : VISITED_COLOR;
    if (this.room) {
      if (this.room.west === null) {
        this.div.style.borderLeftColor = WALL_COLOR;
      }
      if (this.room.north === null) {
        this.div.style.borderTopColor = WALL_COLOR;
      }
      if (this.room.south === null) {
        this.div.style.borderBottomColor = WALL_COLOR;
      }
      if (this.room.east === null) {
        this.div.style.borderRightColor = WALL_COLOR;
      }
    }
  }
}
