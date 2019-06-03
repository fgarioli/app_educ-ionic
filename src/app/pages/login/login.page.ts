import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  LoadingController,
  AlertController
} from "@ionic/angular";
import { AuthServiceProvider } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "login.page.html",
  styleUrls: ["login.page.scss"]
})
export class LoginPage implements OnInit {
  formGroup: FormGroup;

  constructor(
    private router: Router,
    private loadindCtrl: LoadingController,
    private authService: AuthServiceProvider,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.authService.logout();
    this.formGroup = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  async login() {
    let loading = null;
    try {
      loading = await this.loadindCtrl.create({
        message: "Realizando Login"
      });

      await loading.present();

      await this.authService.login(this.formGroup.value);
      this.formGroup.reset();
      
      if (this.authService.getRole() == "ROLE_RESP") {        
        this.router.navigate(["alunos"]);
      } else if (this.authService.getRole() == "ROLE_ALUN") {
        this.router.navigate([
          `/aluno/${this.authService.getUserData().codUsuario}`
        ]);
      }

      await loading.dismiss();
    } catch (error) {
      await loading.dismiss();
      let err = JSON.parse(error.error);
      let hdr = err.error;
      let msg = err.message;
      const alert = await this.alertController.create({
        header: hdr,
        message: msg,
        buttons: [
          {
            text: "Ok"
          }
        ]
      });

      await alert.present();
    }
  }
}
