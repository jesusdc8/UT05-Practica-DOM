import { SuperTienda } from "./manager.js";
import AuxPageView from "./auxPageView.js";
import AuxPageController from "./auxPageController.js";

let BackupApp = (function () {
    let instantiated;
  
    function init() {
      //Inicialización del Singleton
      class BackupApp {
          
        #model = SuperTienda.getInstance();
  
        constructor() {
        }
  
        createBackup(){
            console.log(this.#model);
            let arrayCategories = new Array();
            let arraySmartphones = new Array();
            let arrayLaptops = new Array();
            let arrayProducts = new Array();
            let arrayTvs = new Array();
            let arrayShops = new Array();
            let datos = [];

            let objeto = {};

            objeto.datos = datos;
            let miJson = JSON.stringify(objeto);
            miJson += JSON.stringify(objeto);
            console.log(this.#model.findCategory('Ordenadores').category.toString());
            let obj = {};
            let categories = [];
            categories.push((this.#model.findCategory('Ordenadores').category.toString()).split(','));
            let smartphones = [];
            smartphones.push((this.#model.getProduct('100-101').toString()).split(','));
            smartphones.push((this.#model.getProduct('100-102').toString()).split(','));
            
            obj.categories = categories;
            obj.smartphones = smartphones;

            console.log(JSON.stringify(obj));
                }
          
  
          
      }
      let backupApp = new BackupApp();
        Object.freeze(backupApp);
        return backupApp;
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

  export default BackupApp;