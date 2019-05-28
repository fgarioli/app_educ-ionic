import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { AtivAvalDetailsPage } from "./ativ-aval-details.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: AtivAvalDetailsPage }])
  ],
  declarations: [AtivAvalDetailsPage]
})
export class AtivAvalDetailsPageModule {}
