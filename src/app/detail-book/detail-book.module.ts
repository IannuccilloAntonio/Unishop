import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailBookPageRoutingModule } from './detail-book-routing.module';

import { DetailBookPage } from './detail-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailBookPageRoutingModule
  ],
  declarations: [DetailBookPage]
})
export class DetailBookPageModule {}
