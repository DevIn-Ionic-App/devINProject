import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditArticlePage } from './edit-article.page';

const routes: Routes = [
  {
    path: '',
    component: EditArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditArticlePageRoutingModule {}
