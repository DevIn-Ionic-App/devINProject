import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NowPipe } from './pipes/now.pipe';



@NgModule({
  declarations: [
    NowPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
