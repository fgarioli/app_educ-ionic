import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { ToastController } from "@ionic/angular";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let self = this;
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            let err = JSON.parse(error.error);
            let hdr = err.error;
            let msg = err.message;
            self.presentToast(`${hdr}: ${msg}`);
            break;

          case 403:
            self.presentToast(
              "Sessão expirada: Realize o login novamente",
              true
            );
            this.router.navigate(["login"]);
            break;

          default:
            self.presentToast(`Erro ${error.status}: ${error.error}`, true);
        }

        return throwError(error);
      })
    ) as any;
  }

  async presentToast(msg, bottom = false) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: bottom ? "bottom" : "top"
    });
    toast.present();
  }
}
