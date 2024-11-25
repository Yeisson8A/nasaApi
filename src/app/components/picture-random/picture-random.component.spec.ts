import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureRandomComponent } from './picture-random.component';

describe('PictureRandomComponent', () => {
  let component: PictureRandomComponent;
  let fixture: ComponentFixture<PictureRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureRandomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
