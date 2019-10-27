import { Component, OnInit, ViewChild } from "@angular/core";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { Chart } from "chart.js";
import { ClassServiceProvider } from "src/app/services/class.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-novo-ensino-medio",
  templateUrl: "novo-ensino-medio.page.html",
  styleUrls: ["./novo-ensino-medio.page.scss"]
})
export class NovoEnsinoMedioPage implements OnInit {
  @ViewChild("barChart") barChart;

  chart: any;
  idTurmAlun: number;

  constructor(
    private dataProvider: DataProvider,
    private router: Router,
    private classService: ClassServiceProvider,
    private loadingCtrl: LoadingController
  ) {
    this.idTurmAlun = this.dataProvider.storage.codTurmAlun;
  }

  async ngOnInit() {
    let loading = null;
    try {
      loading = await this.loadingCtrl.create({
        message: "Carregando..."
      });
      await loading.present();
      let result = await this.classService
        .classify(this.idTurmAlun)
        .toPromise();
      this.generateChart(result);
      await loading.dismiss();
    } catch (error) {
      await loading.dismiss();
      throw error;
    }
  }

  generateChart(result) {
    this.chart = new Chart(this.barChart.nativeElement, {
      type: "bar",
      data: {
        labels: [
          "Matemática",
          "Linguagens",
          "Ciências Humanas",
          "Ciências da Natureza"
        ],
        datasets: [
          {
            data: [result[0]*100, result[1]*100, result[2]*100, result[3]*100],
            backgroundColor: [
              "rgb(38, 194, 129)",
              "rgb(255, 99, 132)",
              "rgb(255, 205, 86)",
              "rgb(153, 103, 255)"
            ],
            borderColor: [
              "rgb(38, 194, 129)",
              "rgb(255, 99, 132)",
              "rgb(255, 205, 86)",
              "rgb(153, 103, 255)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [{ barPercentage: 0.6 }]
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false
        },
        legend: {
          display: false,
          position: "bottom",
          boxWidth: 40
        }
      }
    });
  }

  async voltar() {
    this.router.navigate(["aluno"]);
  }
}
