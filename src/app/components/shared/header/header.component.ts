import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() showBackButton: boolean = false;
  @Input() linkAction: string = '';
  @Input() linkText: string = '';
  @Input() showActionButton: boolean = true;

  constructor(private _location: Location) { }

  ngOnInit(): void {}

  public goBack(){
    this._location.back();
  }
}
