import {SuperTienda} from './manager.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from './manager.js';
import { testManager,  testAddObjects} from './managerTest.js';
import {Product, Category, Laptop, Smartphone, Tv} from './manager.js';
import {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException} from './manager.js';

class SuperTiendaController {
    // Creamos los campos privados para el modelo y la vista
    #modelSuperTienda;
    #viewSuperTienda;

    #loadSuperTiendaObjects = () => {
        testAddObjects();
    }

    //los añadimos al constructor
    constructor(model, view){
        this.#modelSuperTienda = model;
        this.#viewSuperTienda = view;
    
        // Eventos iniciales del Controlador
		this.onLoad();
		this.onInit();

		// Enlazamos handlers con la vista
		this.#viewSuperTienda.bindInit(this.handleInit);
        this.#viewSuperTienda.bindShop(this.handleShop);
		// this.#managerView.bindDisplayShops(this.handleDisplayShops);
    }

    onLoad = () => {
        this.#loadSuperTiendaObjects();
    }
   
    onInit = () => {
        this.#viewSuperTienda.displayShops(this.#modelSuperTienda.shops);
        this.#viewSuperTienda.loadDropdowns(this.#modelSuperTienda.shops, this.#modelSuperTienda.categories);
    }

    handleInit = () => {
        this.onInit();
    }

    handleShop = (link) => {
        this.#viewSuperTienda.loadShop(this.#modelSuperTienda.findShop(parseInt(link)), this.#modelSuperTienda.getShopCategories(this.#modelSuperTienda.findShop(parseInt(link)).shop));
    }
    
}
export default SuperTiendaController;