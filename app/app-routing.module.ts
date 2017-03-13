import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }            from './home/home.component';
import {HomeService} from './common/home.service';
const appRoutes: Routes = [
  {                                          // removed square bracket
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },{
         path: 'home',
         component: HomeComponent,
		  resolve:{
			  xigen:HomeService
		  }
      }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
