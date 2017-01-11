/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement, ElementRef } from '@angular/core';
import { CellComponent } from './cell.component';
import { Room } from '../world/room';
import { Directions } from '../world/directions';
import { 
  NOT_VISITED_COLOR, 
  VISITED_COLOR,
  CURRENT_COLOR,
  WALL_COLOR
} from '../settings';

describe('Component: Cell', () => {
  let element: ElementRef = null; 
  let div = null;
  let room: Room = null;
  let component: CellComponent = null;
  it('should create an instance', () => {
    component = new CellComponent();
    expect(component).toBeTruthy();
  });
  describe('processStyle', () => {
    beforeEach(() => {
      room = new Room(); 
      div = {
        style: {
          background: null,
          borderLeftColor: null,
          borderTopColor: null,
          borderBottomColor: null,
          borderRightColor: null
        }
      };
      element = {
        nativeElement: div 
      };
      component = new CellComponent();
    });

    it ('should set background to the not visited color', () => {
      component.room = room; 
      component.cellDiv = element;
      expect(div.style.background).toBe(NOT_VISITED_COLOR);
    });

    it('should set background to current color when room is current', () => {
      room.visited = true;
      component.room = room;
      component.isCurrentRoom = true;
      component.cellDiv = element;
      expect(div.style.background).toBe(CURRENT_COLOR);
    });

    it('should set background to visited color when room has been visited', () => {
      room.visited = true;
      component.room = room;
      component.cellDiv = element;
      expect(div.style.background).toBe(VISITED_COLOR);
    });

    it('should not set the wall color for directions that are not walls', () => {
      room.visited = true;
      room.setDirection(Directions.West, room);
      room.setDirection(Directions.South, room);
      component.room = room;
      component.cellDiv = element;
      expect(div.style.borderTopColor).toBe(WALL_COLOR);
      expect(div.style.borderRightColor).toBe(WALL_COLOR);
      expect(div.style.borderLeftColor).toBe(null);
      expect(div.style.borderBottomColor).toBe(null);
    });

  });
});
