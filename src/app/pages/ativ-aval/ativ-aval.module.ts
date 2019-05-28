import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import AtivAvalPage from "./ativ-aval.page";

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
