import {Component, OnInit, ElementRef, Directive , NgZone } from '@angular/core';
import {Router, Resolve, ActivatedRoute} from '@angular/router';
import {Form} from '@angular/forms';
@Component({
  selector: 'app',
  template: require('./home.component.html')
})
export class HomeComponent implements OnInit{
	public _server=[];
	public _default_leagues=[];
	public _default_leagues_model='';
	public _default_clubes=[];
	public _default_clubes_model=0;
	public _pitches=[];
	public _pitch_model='';
	public _formats=[];
	public _format_model='';
	public _active_format=[];
	public _xigens=[];
	public _league={};
	public _league_model={};
	public _club={};
	public _club_model={};
	public baseUrl='http://localhost:3001/';
	public _team_manager:string;
	public _team_name:string;
	public _disable_element={"xigkex":true};
	public _team_name_x=0;
	public _team_manager_x=0;
	public _gks=[
    			{"id":'a1',"n":"GK: yellow","a":"yellow-avatar.png"},
    			{"id":'a2',"n":"GK: blue","a":"blue-avatar-1.png"},
    			{"id":'a3',"n":"GK: black","a":"black-avatar.png"},
    			{"id":'a4',"n":"GK: green","a":"green-avatar.png"},
    			{"id":'a5',"n":"GK: gray","a":"gray-avatar.png"},
    			{"id":'a6',"n":"GK: orange","a":"yellow-avatar.png"},
    			{"id":'a7',"n":"GK: pink","a":"pink-avatar-1.png"},
    			{"id":'a8',"n":"GK: white","a":"white-avatar.png"},
    			{"id":'a9',"n":"GK: red","a":"red-dark-avatar.png"}
    		];
	constructor(
		private route: ActivatedRoute, private el:ElementRef, private zone:NgZone
	) {
		this._server=this.route.snapshot.data['xigen']; console.log(this._server);
		this._default_leagues=this._server['leagues'];
		this._default_leagues_model='';
		this._formats=this._server['formats'];
		this._format_model=this._formats[0].id;
		this._active_format=this._formats[0].p;
		this._pitches=this._server['pitches'];
		this._pitch_model=this._pitches[0].i;
		this._xigens=this._server['xigen'];
		for (var i = 0; i < this._xigens.length; i++) {
			if(this._xigens[i].id=='xigkex'){
				this._league[this._xigens[i].id]=[];//this._gks;
			}else{
				this._league[this._xigens[i].id]=this._default_leagues;
				this._league_model[this._xigens[i].id]='';
			}
			
			this._club_model[this._xigens[i].id]='';
    	}
		this._club['xigkex']=this._gks;
		this.updateSelectedFormat();
		
	}
	ngOnInit() {
		//console.log(this._default_leagues_model);
		this._team_manager='';
		this._team_name='';
	}
	onDefaultLeagueChange(val){
		this._default_leagues_model = val;
		var filtered=this._default_leagues.filter(function(_e){return _e.id==val});
		this._default_clubes=filtered[0].c;
    	for (var i = 0; i < this._xigens.length; i++) {
			console.log(this._xigens[i]);
			if(this._xigens[i].id=='xigkex'){
				this._league_model[this._xigens[i].id]=0;
				this._club[this._xigens[i].id]=this._gks;
			}else{
				this._league_model[this._xigens[i].id]=val; 
				this._club[this._xigens[i].id]=this._default_clubes;
			}
		}
			
	}
	onDefaultClubChange(val){
		var filtered=this._default_clubes.filter(function(_e){return _e.id==val});
		for (var i = 0; i < this._xigens.length; i++) {
			if(this._xigens[i].id=='xigkex'){
				this._xigens[i].c=filtered[0];
				this._xigens[i].i=filtered[0].a;
			}else{
				this._xigens[i].i=filtered[0].a
			}
			this._club_model[this._xigens[i].id]=val;
		}
	}
	onLeagueChange(val,ob){
		var filtered=this._default_leagues.filter(function(_e){return _e.id==val});
		this._club[ob.id]=filtered[0].c;
		this._club_model[ob.id]='';
	}
	onClubChange(val,ob){
		var cr=ob.id;
    		if(cr=='xigkex'){
    			var gks=this._gks.filter(function(_e){return _e.id==val});
    			var xigen=[];
				for (var i = 0; i < this._xigens.length; i++) {
    	  			if(this._xigens[i].id=='xigkex'){
    	  				this._xigens[i].c=gks[0]
    	  				this._xigens[i].i=gks[0].a;
    	  			}
    				xigen.push(this._xigens[i]);
        		}
        		this._xigens=xigen;
    		}else{
	    		var sel_leg=this._league_model[cr];
				var filtered=this._default_leagues.filter(function(_e){return _e.id==sel_leg});
	    		var clubs=filtered[0].c.filter(function(_e){return _e.id==val});
	    		if(val==''){
	    			var xigen=[];
					for (var i = 0; i < this._xigens.length; i++) {
	        			if(this._xigens[i].id==cr)this._xigens[i].i="default.png"
	    				xigen.push(this._xigens[i]);
	        		};
	        		this._xigens=xigen;
	    			return ;
	    		}
	    		
	    		
	    		var xigen=[];
				for (var i = 0; i < this._xigens.length; i++) {
		  			if(this._xigens[i].id==cr){
		  				this._xigens[i].c=clubs[0]
		  				this._xigens[i].i=clubs[0].a;
		  			}
					xigen.push(this._xigens[i]);
	    		}
	    		this._xigens=xigen;
			
    	}
	}
	onPitchChange(val){
		this._pitch_model=val;
	}
	onFormatChange(val){
		this._format_model=val;
		var filtered=this._formats.filter(function(_e){return _e.id==val});
		this._active_format=filtered[0].p;
		this.updateSelectedFormat();
	}
	updateSelectedFormat(){
		var xigen=[];
		var _xigens=this._xigens;
		for (var i = 0; i < _xigens.length; i++) {
			var _e=this._active_format.filter(function(__d){
				return (__d.id==_xigens[i].id)
			})
			_xigens[i].t=_e[0].t
			xigen.push(_xigens[i]);
		}
		this._xigens=xigen;
	}
	onNumberChange(e,i){
		var _this=this;
		setTimeout(function(){
			var el=_this.el.nativeElement.querySelector('#no'+i.id);
			var elm = (48/2)-el.getComputedTextLength()/2;
			var xigen=[];
			for (var i_ = 0; i_ < _this._xigens.length; i_++) {
				if(_this._xigens[i_].id==i.id){
					_this._xigens[i_].noAx=elm
					console.log(_this._xigens[i_]);
				}
				xigen.push(_this._xigens[i_]);
			} 
			_this._xigens=xigen;
   		},5)
	}
	onNameChange(e,i){
		var _this=this;
		setTimeout(function(){
			var el=_this.el.nativeElement.querySelector('#n'+i.id);
			var elm = (48/2)-el.getComputedTextLength()/2;
			var xigen=[];
			for (var i_ = 0; i_ < _this._xigens.length; i_++) {
				if(_this._xigens[i_].id==i.id){
					_this._xigens[i_].nAx=elm
					console.log(_this._xigens[i_]);
				}
				xigen.push(_this._xigens[i_]);
			} 
			_this._xigens=xigen;
   		},5)
	}
	onTeamNameChange(e,i){
		var _this=this;
		setTimeout(function(){
			var el=_this.el.nativeElement.querySelector('#team_name');
			var elm = 578-el.getComputedTextLength();
			_this._team_name_x=elm;
   		},5)
	}
	onTeamManagerChange(e,i){
		var _this=this;
		setTimeout(function(){
			var el=_this.el.nativeElement.querySelector('#team_manager');
			var elm = 578-el.getComputedTextLength();
			_this._team_manager_x=elm;
   		},5)
	}
}
