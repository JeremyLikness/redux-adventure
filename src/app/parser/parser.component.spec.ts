/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ParserComponent } from './parser.component';
import { KEY_ENTER } from '../settings';

const INPUT = ' Testing ';
const COMMAND: string = INPUT.toLowerCase().trim();

describe('Component: Parser', () => {
  it('should create an instance', () => {
    let component = new ParserComponent();
    expect(component).toBeTruthy();
  });

  it('should ignore empty text', () => {
    let component = new ParserComponent();
    let sub = component.action.subscribe(() => {
      throw new Error('Test failed - should not emit an event.');
    });
    component.enterText();
    sub.unsubscribe();
  });

  it('should emit a command when enterText() is fired', (done) => {
    let component = new ParserComponent();
    component.text = INPUT;
    let sub = component.action.subscribe((command) => {
      expect(command).toEqual(COMMAND);
      done();
    });
    component.enterText();
    sub.unsubscribe();
  });

  it('should do nothing on non-ENTER key presses', () => {
    let component = new ParserComponent();
    component.text = INPUT;
    let sub = component.action.subscribe(() => {
      throw new Error('Test failed - should not emit an event.');
    });
    component.parseInput({keyCode: -1});
    sub.unsubscribe();
  });

  it('should emit a command when ENTER is pressed', (done) => {
    let component = new ParserComponent();
    component.text = INPUT;
    let sub = component.action.subscribe((command) => {
      expect(command).toEqual(COMMAND);
      done();
    });
    component.parseInput({keyCode: KEY_ENTER});
    sub.unsubscribe();
  });
});
