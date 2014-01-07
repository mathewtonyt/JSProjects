define("HelloWorld/HelloWorldController",["jquery"],function(b){function a(){}a.prototype.view=void 0;a.prototype.command=void 0;a.prototype.getTextSuccess=function(a){this.view.setHelloWorldDivText(a)};a.prototype.getTextFailure=function(a){this.view.showError(a)};a.prototype.start=function(){this.view.helloButtonClick=b.proxy(this.helloButtonClick,this);this.view.initialize();this.command.execute(b.proxy(this.getTextSuccess,this),b.proxy(this.getTextFailure,this))};a.prototype.helloButtonClick=
function(){this.view.setHelloButtonText("Clicked")};return a});
define("HelloWorld/desktop/HelloWorldView",["jquery-ui"],function(b){function a(){}a.prototype.div=void 0;a.prototype.helloButtonClick=void 0;a.prototype.initialize=function(){var a=this;b("#helloButton",a.div).button().click(function(b){a.helloButtonClick(b)})};a.prototype.setHelloWorldDivText=function(a){b("#helloMessage",this.div).text(a)};a.prototype.setHelloButtonText=function(a){b("#helloButton span",this.div).text(a)};a.prototype.showError=function(a){window.alert("Error: "+a)};return a});
define("model/HelloWorldCommand",[],function(){function b(){}b.prototype.execute=function(a){a("Hello World")};return b});define("IndexContext",["jquery","HelloWorld/HelloWorldController","HelloWorld/desktop/HelloWorldView","model/HelloWorldCommand"],function(b,a,f,g){function c(){}c.prototype.initialize=function(){var d,e,c;d=new a;e=new f;c=new g;b.extend(e,{div:b("#helloWorld")});b.extend(d,{view:e,command:c});d.start()};return c});$().ready(function(){require(["IndexContext"],function(b){(new b).initialize()})});