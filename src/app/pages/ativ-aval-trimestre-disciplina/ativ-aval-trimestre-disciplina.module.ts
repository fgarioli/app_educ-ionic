import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { AtivAvalTrimestreDisciplinaPage } from "./ativ-aval-trimestre-disciplina.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: AtivAvalTrimestreDisciplinaPage }])
  ],
  declarations: [AtivAvalTrimestreDisciplinaPage]
})
export class AtivAvalTrimestreDisciplinaPageModule {}
