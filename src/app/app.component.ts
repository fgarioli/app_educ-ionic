import { Component } from "@angular/core";
import { Platform, MenuController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthServiceProvider } from "./services/auth.service";
import { Router } from "@angular/router";
import { DataProvider } from "./providers/data.provider";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  public appPages = [
    {
      title: "Calendário Acadêmico",
      url: "/calendario",
      icon: "calendar"
    },
    {
      title: "Sobre",
      url: "/sobre",
      icon: "information-circle-outline"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthServiceProvider,
    private router: Router,
    private menu: MenuController,
    private dataProvider: DataProvider
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.authService.checkToken();
    if (this.authService.isAuthenticated()) {
      let user_data = await this.authService.getUserData();

      if (user_data.role == "ROLE_ALUN") {
        this.router.navigate(["aluno"]);
      } else {
        this.router.navigate(["alunos"]);
      }
    } else {
      this.dataProvider.storage = null;
    }
    await this.platform.ready();
    this.statusBar.show();
    this.splashScreen.hide();
  }

  async logout() {
    this.dataProvider.storage = null;
    await this.menu.toggle();
    await this.authService.logout();
    await this.router.navigate(["/login"]);
  }
}
