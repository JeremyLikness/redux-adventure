/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { describe, it, expect, async, inject } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { GRID_SIZE } from '../settings';
import { Room } from '../world/room';

describe('Component: Map', () => {
  it('should create an instance', () => {
    let component = new MapComponent();
    expect(component).toBeTruthy();
  });

  it('should generate a grid that is a matrix of GRID_SIZE x GRID_SIZE', () => {

    let rooms: Room[] = [];
    let x = GRID_SIZE*GRID_SIZE;
    while (x -= 1) {
      rooms.push(new Room());
    }
    let component = new MapComponent();
    component.rooms = rooms;
    expect(component.grid.length).toEqual(GRID_SIZE);
    for (let idx = 0; idx < component.grid.length; idx += 1) {
      expect(component.grid[idx].length).toEqual(GRID_SIZE);
    }
  });

});
