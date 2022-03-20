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
    #viewAuxPage;

    #loadSuperTiendaObjects = () => {
        testAddObjects();
    }

    #handlerHistory = () => {
        window.addEventListener('popstate', e => {
            // console.log(e.state);
            if (e.state != null){
                this.loadPage(e.state);
            }
        });
    }

    //los añadimos al constructor
    constructor(model, view){
        this.#modelSuperTienda = model;
        this.#viewSuperTienda = view;
    
        // Eventos iniciales del Controlador
		this.onLoad();
		this.onInit();
        this.#handlerHistory();
		// Enlazamos handlers con la vista
		this.#viewSuperTienda.bindInit(this.handleInit);
        // this.#viewSuperTienda.bindShop(this.handleShop);
        this.#viewSuperTienda.bindCategory(this.handleCategory);
        // this.#viewSuperTienda.bindProductType(this.handleProductType);
        // this.#viewAuxPage.bindGetType(this.handleGetType);
    }

    get viewAuxPage(){
        return this.#viewAuxPage;
    }
    set viewAuxPage(value){
        this.#viewAuxPage = value;
    }

    loadPage(page){
        let pageType = page.page;
        switch (pageType) {
            case 'inicio':
                this.onInit();
                break;
            case 'shop':
                this.handleShop(page.shop);
                break;
            case 'category':
                this.handleCategory(page.category);
                break;
            default:
                break;
        }
    }

    onLoad = () => {
        history.pushState({page:'inicio'},null,'');
        this.#loadSuperTiendaObjects();
    }
 
    onInit = () => {
        this.#viewSuperTienda.displayShops(this.#modelSuperTienda.shops);
        this.#viewSuperTienda.loadDropdowns(this.#modelSuperTienda.shops, this.#modelSuperTienda.categories);
        //Reenlazamos el handler
        this.#viewSuperTienda.bindShop(this.handleShop);
        this.#viewSuperTienda.bindCategory(this.handleCategory);
    }

    handleInit = () => {
        this.onInit();
    }

    handleShop = (link) => {
        this.#viewSuperTienda.loadShop(this.#modelSuperTienda.findShop(parseInt(link)), this.#modelSuperTienda.getShopCategories(this.#modelSuperTienda.findShop(parseInt(link)).shop));
    }

    handleCategory = (link) => {
        let category = this.#modelSuperTienda.findCategory(link);
        this.#viewSuperTienda.loadCategory( category , this.#modelSuperTienda.getCategoryProducts(category.category));
    }
}
export default SuperTiendaController;