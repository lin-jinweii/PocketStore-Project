"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4987],{4987:(f,l,r)=>{r.r(l),r.d(l,{LoginPageModule:()=>d});var u=r(9808),t=r(4182),i=r(9537),g=r(501),o=r(2096),c=r(2139);const m=[{path:"",component:(()=>{class e{constructor(n,a){this.router=n,this.authService=a,this.loginForm=new t.cw({email:new t.NI(""),password:new t.NI("")})}login(){this.authService.login(this.loginForm.value.email,this.loginForm.value.password).then(n=>this.authService.getUserRole(this.loginForm.value.email).subscribe(a=>{this.router.navigate("user"==a?["/tabs/new-loan"]:["/tabs/manage"])})).catch(n=>this.loginError=n.message)}}return e.\u0275fac=function(n){return new(n||e)(o.Y36(g.F0),o.Y36(c.e))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-login"]],decls:19,vars:2,consts:[[1,"ion-text-center"],["src","../../assets/img/background.png",1,"background-image"],[3,"formGroup"],["type","email","formControlName","email"],["type","password","formControlName","password"],["type","submit",3,"click"],["color","danger"]],template:function(n,a){1&n&&(o.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),o._uU(3,"PocketStore"),o.qZA()()(),o.TgZ(4,"ion-content",0),o._UZ(5,"img",1),o.TgZ(6,"form",2)(7,"ion-item")(8,"ion-label"),o._uU(9,"Email"),o.qZA(),o._UZ(10,"ion-input",3),o.qZA(),o.TgZ(11,"ion-item")(12,"ion-label"),o._uU(13,"Password"),o.qZA(),o._UZ(14,"ion-input",4),o.qZA(),o.TgZ(15,"ion-button",5),o.NdJ("click",function(){return a.login()}),o._uU(16," Login "),o.qZA()(),o.TgZ(17,"ion-label",6),o._uU(18),o.qZA()()),2&n&&(o.xp6(6),o.Q6J("formGroup",a.loginForm),o.xp6(12),o.hij(" ",a.loginError," "))},directives:[i.Gu,i.sr,i.wd,i.W2,t._Y,t.JL,t.sg,i.Ie,i.Q$,i.pK,i.j9,t.JJ,t.u,i.YG],styles:[".background-image[_ngcontent-%COMP%]{height:30vh;object-fit:cover}"]}),e})()}];let p=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[g.Bz.forChild(m)],g.Bz]}),e})(),d=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[u.ez,t.u5,t.UX,i.Pc,p]]}),e})()}}]);