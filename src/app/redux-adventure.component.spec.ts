/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ReduxAdventureComponent from './redux-adventure.component';
import { ConsoleComponent } from './console';
import { ParserComponent } from './parser';
import { MapComponent } from './map';
import { CellComponent } from './cell';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReduxAdventureComponent,
        ConsoleComponent, 
        ParserComponent, 
        MapComponent,
        CellComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(ReduxAdventureComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Welcome to the Redux Adventure!'`, async(() => {
    let fixture = TestBed.createComponent(ReduxAdventureComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Welcome to the Redux Adventure!');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(ReduxAdventureComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to the Redux Adventure!');
  }));
});
