class Gui {

    constructor(){
        this.cnv = null;
        this.ctx = null;
        this.resources = null;
        this.resourcesToLoad = 0;
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


}