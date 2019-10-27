import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { GradeHorariaServiceProvider } from "src/app/services/grade-horaria.service";
import { MensagemServiceProvider } from "src/app/services/mensagem.service";
import { AuthServiceProvider } from "src/app/services/auth.service";
import { Chart } from "chart.js";

@Component({
  selector: "app-novo-ensino-medio",
  templateUrl: "novo-ensino-medio.page.html",
  styleUrls: ["./novo-ensino-medio.page.scss"]
})
export class NovoEnsinoMedioPage implements OnInit {
  @ViewChild("barChart") barChart;

  chart: any;

  constructor(
    private dataProvider: DataProvider,
    private router: Router,
    public gradeHorariaService: GradeHorariaServiceProvider,
    private msgService: MensagemServiceProvider,
    private authService: AuthServiceProvider,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
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
            data: [18, 10, 3, 70],
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
          position: 'bottom',
          boxWidth: 40
        }
      }
    });
  }

  async voltar() {
    let user_data = await this.authService.getUserData();

    if (user_data.role == "ROLE_ALUN") {
      this.router.navigate(["aluno"]);
    } else {
      this.router.navigate(["alunos"]);
    }
  }
}
