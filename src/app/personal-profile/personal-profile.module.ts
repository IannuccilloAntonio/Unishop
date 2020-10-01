import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalProfilePageRoutingModule } from './personal-profile-routing.module';

import { PersonalProfilePage } from './personal-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalProfilePageRoutingModule
  ],
  declarations: [PersonalProfilePage]
})
export class PersonalProfilePageModule {}
