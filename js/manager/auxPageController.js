import {SuperTienda} from './manager.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from './manager.js';
// import { testManager,  testAddObjects} from './managerTest.js';
import {Product, Category, Laptop, Smartphone, Tv} from './manager.js';
import {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException} from './manager.js';

class AuxPageController {
    // Creamos los campos privados para el modelo y la vista
    #modelSuperTienda;
    #viewAuxPage;
    #productSerial;

    //los añadimos al constructor
    constructor(model, view, productSerial){
        
        this.#modelSuperTienda = model;
        this.#viewAuxPage = view;
        this.#productSerial = productSerial ;
        // Eventos iniciales del Controlador
		this.onLoad();
		this.onInit();

    }


    onLoad = () => {
        
        //Primero, resolvemos el tipo de producto para poder mostrar una vista distinta dependiendo del tipo de producto
        
        switch (this.getProduct().constructor.name) {
            case 'Smartphone':
                this.#viewAuxPage.displaySmartphone(this.getProduct());
                break;
            case 'Laptop':
                this.#viewAuxPage.displayLaptop(this.getProduct());
                break;
            case 'Tv':
                this.#viewAuxPage.displayTv(this.getProduct());
                break;
            case 'Product':
                this.#viewAuxPage.displayProduct(this.getProduct());
                break;
            default:
                break;
        }
    }
    getProduct(){
        return this.#modelSuperTienda.getProduct(this.#productSerial);
    }
 
    onInit = () => {
    }

    
}
export default AuxPageController;