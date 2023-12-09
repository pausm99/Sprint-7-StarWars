import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { ComunicationService } from '../../../services/dialog/comunication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;
  let dialogServiceSpy: jasmine.SpyObj<ComunicationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['login', 'updateUser']);
    dialogServiceSpy = jasmine.createSpyObj('ComunicationService', ['closeDialogFunction']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: ComunicationService, useValue: dialogServiceSpy },
        { provide: Router, useValue: routerSpy },
        MatDialog, // You might need to provide a mock MatDialog if it's used in the component
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should have valid form when valid input is provided', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should set incorrectLogin to true on login error', fakeAsync(() => {

    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });

    component.login();

    tick();

    expect(component.incorrectLogin).toBeTruthy();
  }));
});
