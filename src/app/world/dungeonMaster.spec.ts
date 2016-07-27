import {
  describe,
  expect,
  beforeEach,
  it,
  inject
} from '@angular/core/testing';

import { Directions } from './directions';
import { Room } from './room';
import { Dungeon } from './dungeon';
import { DungeonMaster } from './dungeonMaster'; 
import { ThingSeed } from '../seed/thingSeed';

describe('Room', () => {
    let dm: Dungeon = null;
    beforeEach(() => {
        dm = DungeonMaster();
    });
  it('should generate 100 rooms',
     () => {
        expect(dm).not.toBeNull();
        expect(dm.rooms).not.toBeNull();
        expect(dm.rooms.length).toBe(100);
  });
  it('should ensure every room has at least one wall', () => {
      for (let idx = 0; idx < dm.rooms.length; idx+=1) {
          let room = dm.rooms[idx];
          expect(room.walls.length).toBeGreaterThan(0);
      }
  });
  it('should ensure every room has at most three walls', () => {
      for (let idx = 0; idx < dm.rooms.length; idx+=1) {
          let room = dm.rooms[idx];
          expect(room.walls.length).toBeLessThan(4);
      }
  });
  it('should place all artifacts in the rooms', () => {
      let artifacts = {};
      for (let idx = 0; idx < ThingSeed.length; idx += 1) {
          artifacts[ThingSeed[idx].name] = false; 
      }
      for (let idx = 0; idx < dm.rooms.length; idx += 1) {
          let room = dm.rooms[idx];
          for (let innerIdx = 0; innerIdx < room.things.length; innerIdx += 1) {
              let thing = room.things[innerIdx];
              artifacts[thing.name] = true;
          }
      }
      for (let idx = 0; idx < ThingSeed.length; idx += 1) {
          expect(artifacts[ThingSeed[idx].name]).toBe(true); 
      }      
  });
  it('should pick a current random room', () => {
      expect(dm.currentRoomIdx).toBeGreaterThan(-1);
      expect(dm.currentRoomIdx).toBeLessThan(dm.rooms.length);
  });
  it('should return the current room based on the index', () => {
      expect(dm.currentRoom).toBe(dm.rooms[dm.currentRoomIdx]);      
  });
  it('should add the current room text to the console', () => {
      expect(dm.console.length).toBe(1);
      expect(dm.console[0]).toEqual(dm.currentRoom.longDescription);      
  });
  it('should set the trophy count', () => {
      expect(dm.trophyCount).toBe(ThingSeed.length);      
  });
});
