/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement, ElementRef } from '@angular/core';
import { describe, it, expect, async, inject } from '@angular/core/testing';
import { ConsoleComponent } from './console.component';

describe('Component: Console', () => {
  it('should create an instance', () => {
    let component = new ConsoleComponent();
    expect(component).toBeTruthy();
  });

  it('should set the scrollTop to the scrollHeight on changes', (done) => {

    let component = new ConsoleComponent();
    let div = {
      scrollTop: 20,
      scrollHeight: 100
    };
    let element: ElementRef = {
      nativeElement: div
    };
    component.consoleDiv = element; 
    component.ngOnChanges();
    setTimeout(() => {
      expect(div.scrollTop).toEqual(div.scrollHeight);
      done();
    },0);
  });
});
