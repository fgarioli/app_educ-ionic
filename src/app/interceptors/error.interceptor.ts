import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ToastController } from "@ionic/angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastController: ToastController) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    try {
      return next.handle(req) as any;
    } catch (error) {
      console.log(error);
      let errorObj = error;

      if (errorObj.error) {
        errorObj = errorObj.error;
      }
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      switch (errorObj.staterrorus) {
        case 401:
          this.presentToast(
            "Erro 401: falha de autenticação (Login ou senha incorretos)"
          );
          break;

        case 403:
          this.presentToast("Erro 403");
          break;

        default:
          this.presentToast("Erro " + errorObj.status + ": " + errorObj.error);
      }

      return Observable.throw(error);
    }
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }
}
