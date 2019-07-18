import { Component } from "@angular/core";
import { Platform, MenuController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthServiceProvider } from "./services/auth.service";
import { Router } from "@angular/router";

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
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthServiceProvider,
    private router: Router,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.authService.checkToken();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["alunos"]);
    }
    await this.platform.ready();
    this.statusBar.show();
    this.splashScreen.hide();
  }

  async logout() {
    await this.menu.toggle();
    await this.authService.logout();
    await this.router.navigate(["/login"]);
  }
}
