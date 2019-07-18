import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { AtivAvalDiscPage } from "./ativ-aval-disc.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: AtivAvalDiscPage }])
  ],
  declarations: [AtivAvalDiscPage]
})
export class AtivAvalDiscPageModule {}
