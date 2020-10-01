import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonalProfilePage } from './personal-profile.page';

describe('PersonalProfilePage', () => {
  let component: PersonalProfilePage;
  let fixture: ComponentFixture<PersonalProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
