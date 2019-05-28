import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  LoadingController,
  ToastController,
  NavController
} from "@ionic/angular";

import { TurmAlunDTO } from "../../models/turmalun.dto";
import { AuthServiceProvider } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "login.page.html",
  styleUrls: ["login.page.scss"]
})
export class LoginPage implements OnInit {
  formGroup: FormGroup;

  constructor(
    public router: Router,
    private loadindCtrl: LoadingController,
    private authService: AuthServiceProvider,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.authService.logout();
    this.formGroup = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  async login() {
    try {
      let loading = await this.loadindCtrl.create({
        message: "Realizando Login"
      });

      await loading.present();

      await this.authService.login(this.formGroup.value);

      if (this.authService.getRole() == "ROLE_RESP") {
        // this.nav.navigateForward(`/alunos/${this.authService.getUserData().codUsuario}`);
        this.nav.navigateForward(`/alunos`);
      } else if (this.authService.getRole() == "ROLE_ALUN") {
        this.nav.navigateForward(
          `/aluno/${this.authService.getUserData().codUsuario}`
        );
      }

      await loading.dismiss();
    } catch (error) {
      console.log(error);
      const toast = await this.toastController.create({
        message: "Erro ao realizar Login",
        duration: 2000,
        position: "top"
      });
      await toast.present();
    }
  }
}
