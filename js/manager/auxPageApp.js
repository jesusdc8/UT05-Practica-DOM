// import SuperTiendaController from './managerController.js';
import { SuperTienda } from "./manager.js";
import AuxPageView from "./auxPageView.js";
import AuxPageController from "./auxPageController.js";

// function executeAuxPage(productSerial){

// }

let AuxPageApp = (function () {
  let instantiated;

  function init() {
    //Inicialización del Singleton
    class AuxPageApp {
      #opened = new Map();

      constructor() {
		  this.bindClose();
      }

		newWindow(serial) {
			if (!this.#opened.has(serial)) {
				this.#opened.set(
				serial,
				window.open(
					"auxPage.html",
					serial,
					"width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"
				)
				);
				this.#opened.get(serial).addEventListener("DOMContentLoaded", (event) => {
				this.#opened.get(serial).model = SuperTienda.getInstance();
				this.#opened.get(serial).init(SuperTienda.getInstance());
				});
			} else if (!(this.#opened.get(serial).closed)){
				this.#opened.get(serial).focus();
			} else{
				this.#opened.delete(serial);
				this.newWindow(serial);
			}
		}

		bindClose(){
			$('#closeWindows').click( (e) => { 
				e.preventDefault();
				
				this.#opened.forEach((value) => {
					value.close();
				})
				
			});
		}
    }
	let auxPageApp = new AuxPageApp();
      Object.freeze(auxPageApp);
      return auxPageApp;
  }
  return {
    getInstance: function () {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    },
  };
})();
export default AuxPageApp;
