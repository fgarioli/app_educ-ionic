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
    path: 'boletim',
    loadChildren: './pages/boletim/boletim.module#BoletimPageModule'
  },
  {
    path: 'boletim-details',
    loadChildren: './pages/boletim-details/boletim-details.module#BoletimDetailsPageModule'
  },
  {
    path: 'ativ-aval-disc',
    loadChildren: './pages/ativ-aval-disc/ativ-aval-disc.module#AtivAvalDiscPageModule'
  },
  {
    path: 'ativ-aval',
    loadChildren: './pages/ativ-aval/ativ-aval.module#AtivAvalPageModule'
  },
  {
    path: 'ativ-aval-details',
    loadChildren: './pages/ativ-aval-details/ativ-aval-details.module#AtivAvalDetailsPageModule'
  },
  {
    path: 'frequencia',
    loadChildren: './pages/frequencia/frequencia.module#FrequenciaPageModule'
  },
  {
    path: 'frequencia-trimestre',
    loadChildren: './pages/frequencia-trimestre/frequencia-trimestre.module#FrequenciaTrimestrePageModule'
  },
  {
    path: 'frequencia-details',
    loadChildren: './pages/frequencia-details/frequencia-details.module#FrequenciaDetailsPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
