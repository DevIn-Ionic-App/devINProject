import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentsPagePageRoutingModule } from './comments-page-routing.module';

import { CommentsPagePage } from './comments-page.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
    declarations: [CommentsPagePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CommentsPagePageRoutingModule,
        SharedModule
    ]
})
export class CommentsPagePageModule {}
