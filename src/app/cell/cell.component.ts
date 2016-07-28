import { Component, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Room } from '../world/room';

@Component({
  moduleId: module.id,
  selector: 'cell',
  templateUrl: 'cell.component.html',
  styleUrls: ['cell.component.css']
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
    if (!this.room.visited) {
      this.div.style.background = 'black';
      return;
    }
    this.div.style.background = this.isCurrentRoom ? '#aaffaa' : 'white';
    if (this.room) {
      if (this.room.west === null) {
        this.div.style.borderLeftColor = "black";
      }
      if (this.room.north === null) {
        this.div.style.borderTopColor = "black";
      }
      if (this.room.south === null) {
        this.div.style.borderBottomColor = "black";
      }
      if (this.room.east === null) {
        this.div.style.borderRightColor = "black";
      }      
    }
  }
}
