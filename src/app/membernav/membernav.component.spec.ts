import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembernavComponent } from './membernav.component';

describe('MembernavComponent', () => {
  let component: MembernavComponent;
  let fixture: ComponentFixture<MembernavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembernavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
