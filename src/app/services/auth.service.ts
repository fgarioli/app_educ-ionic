import { UsuarioDTO } from "../models/usuario.dto";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { Platform } from "@ionic/angular";
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

  private user: UsuarioDTO = null;
  private role = null;

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private storage: Storage,
    private helper: JwtHelperService
  ) {
    this.platform.ready().then(() => {
      // console.log("Check Token!!!!!!!");
      this.checkToken();
    });
  }

  async login(cred: CredenciaisDTO) {
    try {
      let res = await this.http
        .post(
          `${environment.api}/login`,
          {},
          {
            headers: new HttpHeaders().set(
              "Content-Type",
              "application/x-www-form-urlencoded"
            ),
            params: {
              username: cred.username,
              password: cred.password,
              grant_type: "access_token"
            },
            observe: "response",
            responseType: "text"
          }
        )
        .toPromise();

      await this.sucessfullLogin(res.headers.get("Authorization"));
    } catch (error) {
      console.log(error);
    }
  }

  async refreshToken() {
    try {
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

      await this.sucessfullLogin(res.headers.get("Authorization"));
    } catch (error) {
      console.log(error);
    }
  }

  private async sucessfullLogin(authValue: string) {
    try {
      authValue = authValue.substring(7);
      await this.storage.set(TOKEN_KEY, authValue);

      let decoded = this.helper.decodeToken(authValue);
      this.user = decoded["user_data"];
      this.role = decoded["authorities"][0]["authority"];
      this.authState.next(true);
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    await this.storage.remove(TOKEN_KEY);
    this.authState.next(false);
  }

  async checkToken() {
    try {
      let token = await this.storage.get(TOKEN_KEY);

      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authState.next(true);
        } else {
          await this.storage.remove(TOKEN_KEY);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  isAuthenticated() {
    return this.authState.value;
  }

  getToken() {
    return this.storage.get(TOKEN_KEY);
  }

  getRole() {
    return this.role;
  }

  getUserData(): UsuarioDTO {
    return this.user;
  }
}
