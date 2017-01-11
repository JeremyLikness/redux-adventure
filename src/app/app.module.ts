import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ReduxAdventureComponent } from './redux-adventure.component';
import { ConsoleComponent } from './console';
import { ParserComponent } from './parser';
import { MapComponent } from './map';
import { CellComponent } from './cell';

@NgModule({
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
  providers: [],
  bootstrap: [ReduxAdventureComponent]
})
export class AppModule { }
