import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes do projeto
import { HomeComponent } from './components/home/home.component';
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'experimentar',
    component: Step1Component
  },
  {
    path: 'cadastro-concluido',
    component: Step2Component
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
