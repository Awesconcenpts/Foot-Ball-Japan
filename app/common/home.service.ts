import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
@Injectable()
export class HomeService implements Resolve<any>{ 
	constructor(private http:Http) {
	}
	resolve(): Observable<any> {
		return this.http.get('json.html').map(response => response.json());
	}
}