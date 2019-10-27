import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'alunos',
    loadChildren: './pages/alunos/alunos.module#AlunosPageModule'
  },
  {
    path: 'aluno',
    loadChildren: './pages/aluno/aluno.module#AlunoPageModule'
  },
  {
    path: 'calendario',
    loadChildren: './pages/calendario-academico/calendario.module#CalendarioPageModule'
  },
  {
    path: 'grade-horaria',
    loadChildren: './pages/grade-horaria/grade-horaria.module#GradeHorariaPageModule'
  },
  {
    path: 'grade-details',
    loadChildren: './pages/grade-horaria-details/grade-horaria-details.module#GradeHorariaDetailsPageModule'
  },
  {
    path: 'mensagens',
    loadChildren: './pages/mensagens/mensagens.module#MensagensPageModule'
  },
  {
    path: 'mensagens-details',
    loadChildren: './pages/mensagens-details/mensagens-details.module#MensagensDetailsPageModule'
  },
  {
    path: 'boletim-trimestre',
    loadChildren: './pages/boletim-trimestre/boletim-trimestre.module#BoletimTrimestrePageModule'
  },
  {
    path: 'boletim-trimestre-disciplina',
    loadChildren: './pages/boletim-trimestre-disciplina/boletim-trimestre-disciplina.module#BoletimTrimestreDisciplinaPageModule'
  },
  {
    path: 'ativ-aval-disc',
    loadChildren: './pages/ativ-aval-disc/ativ-aval-disc.module#AtivAvalDiscPageModule'
  },
  {
    path: 'ativ-aval-trimestre',
    loadChildren: './pages/ativ-aval-trimestre/ativ-aval-trimestre.module#AtivAvalTrimestrePageModule'
  },
  {
    path: 'ativ-aval-trimestre-disciplina',
    loadChildren: './pages/ativ-aval-trimestre-disciplina/ativ-aval-trimestre-disciplina.module#AtivAvalTrimestreDisciplinaPageModule'
  },
  {
    path: 'ativ-aval-details',
    loadChildren: './pages/ativ-aval-details/ativ-aval-details.module#AtivAvalDetailsPageModule'
  },
  {
    path: 'frequencia-trimestre',
    loadChildren: './pages/frequencia-trimestre/frequencia-trimestre.module#FrequenciaTrimestrePageModule'
  },
  {
    path: 'frequencia-trimestre-disciplina',
    loadChildren: './pages/frequencia-trimestre-disciplina/frequencia-trimestre-disciplina.module#FrequenciaTrimestreDisciplinaPageModule'
  },
  {
    path: 'frequencia-details',
    loadChildren: './pages/frequencia-details/frequencia-details.module#FrequenciaDetailsPageModule'
  },
  {
    path: 'sobre',
    loadChildren: './pages/sobre/sobre.module#SobrePageModule'
  },
  {
    path: 'novo-ensino-medio',
    loadChildren: './pages/novo-ensino-medio/novo-ensino-medio.module#NovoEnsinoMedioPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
