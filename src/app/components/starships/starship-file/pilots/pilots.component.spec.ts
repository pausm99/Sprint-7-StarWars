import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';
import { PilotsComponent } from './pilots.component';
import { StarwarsService } from '../../../../services/starwars/starwars.service';

describe('PilotsComponent', () => {
  let component: PilotsComponent;
  let fixture: ComponentFixture<PilotsComponent>;
  let starWarsServiceSpy: jasmine.SpyObj<StarwarsService>;

  beforeEach(() => {
    starWarsServiceSpy = jasmine.createSpyObj('StarwarsService', ['getPilot', 'getPilotPicture']);

    TestBed.configureTestingModule({
      declarations: [PilotsComponent],
      imports: [CommonModule],
      providers: [
        { provide: StarwarsService, useValue: starWarsServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(PilotsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPilots on ngOnChanges', () => {
    spyOn(component, 'getPilots');
    const changes = { pilotsURLs: { currentValue: ['url1', 'url2'], previousValue: undefined, firstChange: true, isFirstChange: () => true } };

    component.ngOnChanges(changes);

    expect(component.getPilots).toHaveBeenCalled();
  });
});
