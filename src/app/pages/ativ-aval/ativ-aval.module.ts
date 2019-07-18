import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { AtivAvalPage } from "./ativ-aval.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: AtivAvalPage }])
  ],
  declarations: [AtivAvalPage]
})
export class AtivAvalPageModule {}
