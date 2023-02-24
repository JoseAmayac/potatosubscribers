import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty username and password', () => {
    expect(component.loginForm.controls['username'].value).toEqual('');
    expect(component.loginForm.controls['password'].value).toEqual('');
  });

  it('should have loading in false', () => {
    expect(component.isSending).toBeFalsy();
  });

  it('should have button disabled', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });

  it('should enable login button when formGroup is filled', () => {
    component.loginForm.setValue({
      username: 'test@gmail.com',
      password: '4rty987654'
    });
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeFalsy();
  });

  it('should call onLogin method when login button is clicked', () => {
    spyOn(component, 'onLogin');
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.onLogin).toHaveBeenCalled();
  });


});
