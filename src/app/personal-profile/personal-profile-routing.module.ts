import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalProfilePage } from './personal-profile.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalProfilePageRoutingModule {}
