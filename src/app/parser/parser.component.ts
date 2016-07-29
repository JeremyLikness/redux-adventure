import { Component, Output, EventEmitter } from '@angular/core';
import { KEY_ENTER } from '../settings';

@Component({
  moduleId: module.id,
  selector: 'parser',
  templateUrl: 'parser.component.html',
  styleUrls: ['parser.component.css']
})
export class ParserComponent {

  @Output('action')
  public action: EventEmitter<string> = new EventEmitter<string>();

  public text: string = '';

  constructor() { }

  public parseInput($event: any) {
    if ($event && $event.keyCode === KEY_ENTER) {
      this.enterText();
    }
  }

  public enterText(): void {
    let command = this.text.toLowerCase().trim();
    if (command) {
      this.action.emit(command);
    }
    this.text = '';
  }

}
