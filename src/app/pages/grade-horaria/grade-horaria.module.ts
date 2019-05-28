import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { GradeHorariaPage } from './grade-horaria.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: GradeHorariaPage }])
  ],
  declarations: [GradeHorariaPage]
})
export class GradeHorariaPageModule {}
