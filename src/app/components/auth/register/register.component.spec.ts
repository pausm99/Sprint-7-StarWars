import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { UsersService } from '../../../services/users.service';
import { ComunicationService } from '../../../services/dialog/comunication.service';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;
  let dialogServiceSpy: jasmine.SpyObj<ComunicationService>;

  beforeEach(() => {
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['isEmailRegistered', 'register', 'login', 'updateUser']);
    dialogServiceSpy = jasmine.createSpyObj('ComunicationService', ['closeDialogFunction']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: ComunicationService, useValue: dialogServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have invalid form initially', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should have valid form when valid input is provided', () => {
    component.registerForm.setValue({
      firstName: 'Pau',
      lastName: 'Sàbat',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(component.registerForm.valid).toBeTruthy();
  });



  it('should set repeatedEmail to true when email is already registered', fakeAsync(() => {
    usersServiceSpy.isEmailRegistered.and.returnValue(of(true));

    component.registerForm.setValue({
      firstName: 'Pau',
      lastName: 'Sàbat',
      email: 'test@example.com',
      password: 'password123',
    });

    component.register();

    tick();

    expect(component.repeatedEmail).toBeTruthy();
  }));

  it('should not perform any actions when the form is invalid', fakeAsync(() => {
    spyOn(usersServiceSpy, 'isEmailRegistered');
    spyOn(usersServiceSpy, 'register');

    // Invalid form
    component.registerForm.setValue({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
    component.register();

    tick();

    expect(usersServiceSpy.isEmailRegistered).not.toHaveBeenCalled();
    expect(usersServiceSpy.register).not.toHaveBeenCalled();
  }));


  it('should not perform login if registration fails', fakeAsync(() => {
    usersServiceSpy.isEmailRegistered.and.returnValue(of(false));

    component.registerForm.setValue({
      firstName: 'Pau',
      lastName: 'Sàbat',
      email: 'test@example.com',
      password: 'password123',
    });

    component.register();

    tick();

    expect(usersServiceSpy.login).not.toHaveBeenCalled();
  }));
});
