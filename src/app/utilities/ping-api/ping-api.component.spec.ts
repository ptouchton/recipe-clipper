import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PingApiComponent } from './ping-api.component';

describe('PingApiComponent', () => {
  let component: PingApiComponent;
  let fixture: ComponentFixture<PingApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PingApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PingApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
