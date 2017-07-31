import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAddFormComponent } from './character-add-form.component';

describe('CharacterAddFormComponent', () => {
  let component: CharacterAddFormComponent;
  let fixture: ComponentFixture<CharacterAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
