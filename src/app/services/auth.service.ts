import { CredenciaisDTO } from "../models/credenciais.dto";
import { Storage } from "@ionic/storage";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

const TOKEN_KEY = "access_token";

@Injectable({
  providedIn: "root"
})
export class AuthServiceProvider {
  private authState = new BehaviorSubject(false);
  private userData = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private helper: JwtHelperService
  ) {}

  async login(cred: CredenciaisDTO) {
    let res = await this.http
      .post(
        `${environment.api}/login`,
        `username=${cred.username}&password=${cred.password}`,
        {
          headers: new HttpHeaders().set(
            "Content-Type",
            "application/x-www-form-urlencoded"
          ),
          params: { grant_type: "access_token" },
          observe: "response",
          responseType: "text"
        }
      )
      .toPromise();

    let token = res.headers.get("Authorization");

    return await this.sucessfullLogin(token.substring(7));
  }

  async refreshToken() {
    let res = await this.http
      .post(
        `${environment.api}/login`,
        {},
        {
          headers: new HttpHeaders().set(
            "Content-Type",
            "application/x-www-form-urlencoded"
          ),
          params: { grant_type: "refresh_token" },
          observe: "response",
          responseType: "text"
        }
      )
      .toPromise();

    let token = res.headers.get("Authorization");

    return await this.sucessfullLogin(token.substring(7));
  }

  private async sucessfullLogin(authValue: string) {
    let decoded = this.helper.decodeToken(authValue);
    await this.storage.set("user_data", {
      role: decoded["authorities"][0]["authority"],
      user: decoded["user_data"]
    });
    await this.storage.set(TOKEN_KEY, authValue);

    this.authState.next(true);
    this.userData.next({
      role: decoded["authorities"][0]["authority"],
      user: decoded["user_data"]
    });

    return await this.getUserData();
  }

  async logout() {
    await this.storage.remove(TOKEN_KEY);
    await this.storage.remove("user_data");
    this.authState.next(false);
  }

  async checkToken() {
    let token = await this.storage.get(TOKEN_KEY);

    if (token) {
      let isExpired = this.helper.isTokenExpired(token);

      if (!isExpired) {
        await this.sucessfullLogin(token);
      } else {
        await this.logout();
      }
    }
  }

  isAuthenticated() {
    return this.authState.value;
  }

  getToken() {
    return this.storage.get(TOKEN_KEY);
  }

  getUserData() {
    return this.userData.getValue();
  }
}
