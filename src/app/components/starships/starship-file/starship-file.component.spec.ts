import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipFileComponent } from './starship-file.component';

describe('StarshipFileComponent', () => {
  let component: StarshipFileComponent;
  let fixture: ComponentFixture<StarshipFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarshipFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
