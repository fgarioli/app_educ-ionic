import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { AtivAvalTrimestrePage } from "./ativ-aval-trimestre.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: AtivAvalTrimestrePage }])
  ],
  declarations: [AtivAvalTrimestrePage]
})
export class AtivAvalTrimestrePageModule {}
