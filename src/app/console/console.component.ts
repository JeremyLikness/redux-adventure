import { Component, Input, ElementRef, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnChanges {

  private div: HTMLDivElement;

  @ViewChild('consoleDiv')
  public set consoleDiv(elem: ElementRef) {
    this.div = elem.nativeElement;
  }

  @Input('list')
  public list: string[];

  constructor() { }

  ngOnChanges(): void {
    if (this.div) {
      setTimeout(() => this.div.scrollTop = this.div.scrollHeight, 0);
    }
  }

}
