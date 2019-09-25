import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController, AlertController, Platform } from "@ionic/angular";
import { AuthServiceProvider } from "../../services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "login.page.html",
  styleUrls: ["login.page.scss"]
})
export class LoginPage implements OnInit {
  formGroup: FormGroup = this.formBuilder.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });
  subscription: Subscription;

  constructor(
    private router: Router,
    private loadindCtrl: LoadingController,
    private authService: AuthServiceProvider,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private platform: Platform
  ) {}

  async ngOnInit() {
    this.formGroup.reset();
    // this.subscription = this.platform.backButton.subscribeWithPriority(
    //   0,
    //   () => {
    //     navigator["app"].exitApp();
    //     // code that is executed when the user pressed the back button
    //     // and ionic doesn't already know what to do (close modals etc...)
    //   }
    // );
  }

  async login() {
    let loading = null;
    try {
      loading = await this.loadindCtrl.create({
        message: "Realizando Login"
      });

      await loading.present();

      let user_data = await this.authService.login(this.formGroup.value);

      if (user_data.role == "ROLE_RESP") {
        this.router.navigate(["alunos"]);
      } else if (user_data.role == "ROLE_ALUN") {
        this.router.navigate(["aluno"]);
      }

      await loading.dismiss();
    } catch (error) {
      await loading.dismiss();
      // let err = JSON.parse(error.error);
      // let hdr = err.error;
      // let msg = err.message;
      // const alert = await this.alertController.create({
      //   header: hdr,
      //   message: msg,
      //   buttons: [
      //     {
      //       text: "Ok"
      //     }
      //   ]
      // });

      // await alert.present();
    }
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
