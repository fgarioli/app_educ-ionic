import { NgModule } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { SobrePage } from "./sobre.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthServiceProvider } from "src/app/services/auth.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: SobrePage }])
  ],
  declarations: [SobrePage]
})
export class SobrePageModule {}
