import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailBookPage } from './detail-book.page';

const routes: Routes = [
  {
    path: '',
    component: DetailBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailBookPageRoutingModule {}
