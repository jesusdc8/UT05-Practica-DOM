import {SuperTienda} from './manager.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from './manager.js';
import {Product, Category} from './manager.js';
import {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException} from './manager.js';

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

    onDisplayShops = () => {
        this.#viewSuperTienda.displayShops();
    }
    
}
export default SuperTiendaController;