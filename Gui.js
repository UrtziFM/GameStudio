class Gui {

    constructor(game){
        this.cnv = null;
        this.ctx = null;
        this.resources = null;
        this.resourcesToLoad = 0;
        this.gameloop = new Gameloop(game);
    }

    resize(){
        if( this.cnv ){
            this.cnv.width = window.innerWidth;
            this.cnv.height = window.innerHeight;
        } 
     }
 
     prepareCanvas() {
         this.cnv = document.getElementById("canvas");
         this.ctx = this.cnv.getContext("2d");
         document.body.style.margin = 0;
         document.body.style.padding = 0;
         this.resize();
     }

     toggleScreen(id, toggle) {
        let element = document.getElementById(id);
        let display = (toggle) ? "block" : "none";
        element.style.display = display;
    }

    closeAllScreens() {
        let elements = document.querySelectorAll(".screen");
        [...elements].forEach( e => {
            e.style.display = "none";
        });
    }

    showScreen(id) {
        this.closeAllScreens();
        this.toggleScreen(id, true);
   }

   launchIfReady() {
    this.resourcesToLoad--;
    if (this.resourcesToLoad == 0){
        this.prepareCanvas();
        this.showScreen("start");
        }
    }

    beginLoadingImage(imgVar, fileName){
        imgVar.onload = () => this.launchIfReady();
        imgVar.src = fileName;
    }

    load(resources) {
        if(!resources || resources.length == 0){
            this.prepareCanvas();
            this.showScreen("start");
            return;
        }

        if(resources) {
            this.resources = resources;
            this.resourcesToLoad = this.resources.length;

            for(let i = 0; i < this.resources.length; i++)
                if(this.resources[i].var != undefined) {
                    if(this.resources[i].var.nodeName == "IMG"){
                        this.beginLoadingImage(
                            this.resources[i].var,
                            this.resources[i].file);
                    }
                    
                }
            }
        }

    getResource(id){
        return this.resources.filter(r => r.id === id)[0].var;
        }
    
    getResources(){
        return this.resources;
        }
    
    startGame(){
        this.prepareCanvas();
        this.showScreen("canvas");
        this.gameloop.start();
    }
    
    stopGame(){
        this.showScreen("end");
        this.gameloop.stop();
    }

    winGame(){
        this.showScreen("win");
        this.gameloop.stop();
    }

}