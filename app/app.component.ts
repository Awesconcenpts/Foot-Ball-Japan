import {NgModule,Component} from '@angular/core';
import {Routes,RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HomeService} from './common/home.service';

@Component({
  selector: 'app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
  providers: [HomeService],
})


/*
const ROUTES: Routes = [
  {path: '/',component: HomeComponent,resolve: (model: HomeService) => {return model.getData();},
  {path: '/home',        component: HomeComponent},
];
@NgModule({
  imports: [ ROUTES ]
})

*/
export class AppComponent {}