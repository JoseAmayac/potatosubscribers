import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private _location: Location,
              private authService: AuthService) { }

  ngOnInit(): void {}

  public goBack(){
    this._location.back();
  }

  public signOut(): void{
    this.authService.logout();
  }
}
