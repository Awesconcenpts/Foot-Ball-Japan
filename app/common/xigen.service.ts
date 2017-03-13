import {Injectable} from '@angular/core';

@Injectable()
export class XigenService{
	public _xigen ={};

	getXigen() {
		return this._xigen;
	};

	setXigen(newMessage) {
		this._xigen = newMessage;
	};
	getLeagues() {
		if(this._xigen.hasOwnProperty('leagues')){
			return this._xigen['leagues'];
		}else{
			return false;
		}
	};
	getClubes() {
		if(this._xigen.hasOwnProperty('clubes')){
			return this._xigen['clubes'];
		}else{
			return false;
		}
	};
}
