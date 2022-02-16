import SuperTienda from './managerModel.js';

class SuperTiendaController {
    // Creamos los campos privados para el modelo y la vista
    #modelSuperTienda;
    #viewSuperTienda;

    //los añadimos al constructor
    constructor(model, view){
        this.#modelSuperTienda = model;
        this.#viewSuperTienda = view;
    
        this.onInit();
    }

    onInit = () => {
        this.#viewSuperTienda.init();
    }
    
}
export default SuperTiendaController;