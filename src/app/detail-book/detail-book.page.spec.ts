import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailBookPage } from './detail-book.page';

describe('DetailBookPage', () => {
  let component: DetailBookPage;
  let fixture: ComponentFixture<DetailBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
