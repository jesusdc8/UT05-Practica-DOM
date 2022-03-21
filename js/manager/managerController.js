import {SuperTienda} from './manager.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from './manager.js';
import { testManager,  testAddObjects} from './managerTest.js';
import {Product, Category, Laptop, Smartphone, Tv} from './manager.js';
import { Shop } from './manager.js';
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

        if (this.readCookie() === 'admin'){
            this.#viewSuperTienda.showLogInModal(true, this.readCookie());
            this.#viewSuperTienda.showAdminButton(true);
            this.#viewSuperTienda.loadAdminMenu();
            this.#viewSuperTienda.bindAdmin(this.handleAdmin);
            this.#viewSuperTienda.showLoggedButton(true);
            this.#viewSuperTienda.bindLogOut(this.handleLogOut);
        } else {
            this.#viewSuperTienda.showLoggedButton(false);
        }
    }
 
    onInit = () => {
        
        this.#viewSuperTienda.displayShops(this.#modelSuperTienda.shops);
        this.#viewSuperTienda.loadDropdowns(this.#modelSuperTienda.shops, this.#modelSuperTienda.categories);
        
        //Reenlazamos el handler
        this.#viewSuperTienda.bindShop(this.handleShop);
        this.#viewSuperTienda.bindCategory(this.handleCategory);
        this.#viewSuperTienda.bindLogIn(this.handleLogIn);
    }

    readCookie(){
        let re = new RegExp('(?:(?:^|.*;\\s*)' + 'username' + '\\s*\\=\\s*([^;]*).*$)|^.*$');
        return document.cookie.replace(re, "$1");
    }

    handleInit = () => {
        this.onInit();
    }

    handleShop = (link) => {
        this.#viewSuperTienda.loadShop(this.#modelSuperTienda.findShop(link), this.#modelSuperTienda.getShopCategories(this.#modelSuperTienda.findShop(link).shop));
    }

    handleCategory = (link) => {
        let category = this.#modelSuperTienda.findCategory(link);
        this.#viewSuperTienda.loadCategory( category , this.#modelSuperTienda.getCategoryProducts(category.category));
    }

    handleAdmin = (link) => {
        
        switch (link) {
            case 'addProductForm':
                this.#viewSuperTienda.addProductForm(this.#modelSuperTienda.categories);
                this.#viewSuperTienda.bindNewProductForm(this.handleCreateProduct);
                break;
            case 'addCategoryForm':
                this.#viewSuperTienda.addCategoryForm();
                this.#viewSuperTienda.bindNewCategoryForm(this.handleCreateCategory);
                break;
            case 'deleteProductForm':
                this.#viewSuperTienda.deleteProductForm(this.#modelSuperTienda.products);
                this.#viewSuperTienda.bindDeleteProductForm(this.handleDeleteProduct);
                break;
            case 'deleteCategoryForm':
                this.#viewSuperTienda.deleteCategoryForm(this.#modelSuperTienda.categories);
                this.#viewSuperTienda.bindDeleteCategoryForm(this.handleDeleteCategory);
                break
            case 'deleteShopForm':
                this.#viewSuperTienda.deleteShopForm(this.#modelSuperTienda.shops);
                this.#viewSuperTienda.bindDeleteShopForm(this.handleDeleteShop);
                break
            case 'addShopForm':
                this.#viewSuperTienda.addShopForm();
                this.#viewSuperTienda.bindNewShopForm(this.handleCreateShop);
                break;
                
            default:
                break;
        }
    }

    handleCreateProduct = (type, form) => {
        switch (type) {
                case 'Product':
                    let product = new Product(form.serial.value, form.brand.value, form.model.value, form.price.value, form.description.value);
                    let done, error;
                    let categories =[];
                    try{
                        this.#modelSuperTienda.addProduct(product);
                        $("input[name=categories]:checked").each(function(){
                            categories.push(this.value);
                        });

                        categories.forEach((value)=>{
                            this.#modelSuperTienda.addProductInCategory(this.#modelSuperTienda.findCategory(value).category, product);
                        });
                        done = true;
                    } catch(exception){
                        done = false;
                        error = exception;
                    }
                        this.#viewSuperTienda.showNewProductModal(done, product, error);
                    break;
                case 'Smartphone':
                    let smartphone = new Smartphone(form.serial.value, form.brand.value, form.model.value, form.price.value, form.description.value, form.band.value, form.storage.value, form.color.value);
                    let doneSmartphone, errorSmartphone;
                    let categoriesSmartphone =[];
                    try{
                        this.#modelSuperTienda.addProduct(smartphone);
                        $("input[name=categories]:checked").each(function(){
                            categoriesSmartphone.push(this.value);
                        });
                        categoriesSmartphone.forEach((value)=>{
                            this.#modelSuperTienda.addProductInCategory(this.#modelSuperTienda.findCategory(value).category, smartphone);
                        });
                        doneSmartphone = true;
                    } catch(exception){
                        doneSmartphone = false;
                        errorSmartphone = exception;
                    }
                        this.#viewSuperTienda.showNewProductModal(doneSmartphone, smartphone, errorSmartphone);
                    break;
                case 'Tv':
                    let tv = new Tv(form.serial.value, form.brand.value, form.model.value, form.price.value, form.description.value, form.inches.value, form.smart.value);
                    let doneTv, errorTv;
                    let categoriesTv =[];
                    try{
                        this.#modelSuperTienda.addProduct(tv);
                        $("input[name=categories]:checked").each(function(){
                            categoriesTv.push(this.value);
                        });
                        categoriesTv.forEach((value)=>{
                            this.#modelSuperTienda.addProductInCategory(this.#modelSuperTienda.findCategory(value).category, tv);
                        });
                        doneTv = true;
                    } catch(exception){
                        doneTv = false;
                        errorTv = exception;
                    }
                        this.#viewSuperTienda.showNewProductModal(doneTv, tv, errorTv);
                    break; 
                case 'Laptop':
                    let laptop = new Laptop(form.serial.value, form.brand.value, form.model.value, form.price.value, form.description.value, form.processor.value, form.memory.value, form.storage.value);
                    let doneLaptop, errorLaptop;
                    let categoriesLaptop =[];
                    try{
                        this.#modelSuperTienda.addProduct(laptop);
                        $("input[name=categories]:checked").each(function(){
                            categoriesLaptop.push(this.value);
                        });
                        categoriesLaptop.forEach((value)=>{
                            this.#modelSuperTienda.addProductInCategory(this.#modelSuperTienda.findCategory(value).category, laptop);
                        });
                        doneLaptop = true;
                    } catch(exception){
                        doneLaptop = false;
                        errorLaptop = exception;
                    }
                        this.#viewSuperTienda.showNewProductModal(doneLaptop, laptop, errorLaptop);
                    break;
            default:
                break;
        }
    }
    handleCreateCategory = (form) => {
        let category = new Category(form.title.value, form.description.value, form.image.value);
        let done, error;
        try {
            this.#modelSuperTienda.addCategory(category);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#viewSuperTienda.showNewCategoryModal(done, category, error);
        this.#viewSuperTienda.loadDropdowns(this.#modelSuperTienda.shops, this.#modelSuperTienda.categories);
        this.#viewSuperTienda.bindCategory(this.handleCategory);
        this.#viewSuperTienda.bindShop(this.handleShop);

    }

    handleDeleteProduct = (serial) => { 
        let done, error;
        try {
            this.#modelSuperTienda.deleteProduct(serial);
            this.#modelSuperTienda.deleteProductInShop(serial);
            this.#modelSuperTienda.deleteProductInCategory(serial);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#viewSuperTienda.showDeleteProductModal(done, serial, error);
        this.#viewSuperTienda.loadDropdowns(this.#modelSuperTienda.shops, this.#modelSuperTienda.categories);
        this.#viewSuperTienda.bindCategory(this.handleCategory);
        this.#viewSuperTienda.bindShop(this.handleShop);

    }

    handleDeleteCategory = (category) => { 
        let done, error;
        try {
            this.#modelSuperTienda.deleteCategory(category);            
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#viewSuperTienda.showDeleteCategoryModal(done, category, error);
        this.#viewSuperTienda.loadDropdowns(this.#modelSuperTienda.shops, this.#modelSuperTienda.categories);
        this.#viewSuperTienda.bindCategory(this.handleCategory);
        this.#viewSuperTienda.bindShop(this.handleShop);

    }

    handleDeleteShop = (shop) => { 
        let done, error;
        try {
            this.#modelSuperTienda.deleteShop(shop);            
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#viewSuperTienda.showDeleteShopModal(done, shop, error);
        this.#viewSuperTienda.loadDropdowns(this.#modelSuperTienda.shops, this.#modelSuperTienda.categories);
        this.#viewSuperTienda.bindCategory(this.handleCategory);
        this.#viewSuperTienda.bindShop(this.handleShop);

    }

    handleCreateShop = (form) => {
        let shop = new Shop(form.id.value, form.address.value,  form.city.value, form.country.value, form.image.value);
        let done, error;
        try {
            this.#modelSuperTienda.addShop(shop);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#viewSuperTienda.showNewShopModal(done, shop, error);
        this.#viewSuperTienda.loadDropdowns(this.#modelSuperTienda.shops, this.#modelSuperTienda.categories);
        this.#viewSuperTienda.bindCategory(this.handleCategory);
        this.#viewSuperTienda.bindShop(this.handleShop);

    }

    handleLogIn = () => {
        this.#viewSuperTienda.logInForm();
        this.#viewSuperTienda.bindlogInForm(this.handleCreateCookie);
    }

    handleCreateCookie = (form) => {
        const d = new Date();
        d.setTime(d.getTime() + (3*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = 'username' + "=" + form.user.value + ";" + expires + ";path=/";
        this.onInit();
        this.#viewSuperTienda.showAdminButton(true);
        this.#viewSuperTienda.loadAdminMenu();
        this.#viewSuperTienda.bindAdmin(this.handleAdmin);
        this.#viewSuperTienda.bindLogOut(this.handleLogOut);
        this.#viewSuperTienda.showLogInModal(true, form.user.value);
        this.#viewSuperTienda.showLoggedButton(true);

    }

    handleLogOut = () => {
        const d = new Date();
        d.setTime(d.getTime() + (0*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = 'username' + "=" + '' + ";" + expires + ";path=/";
        this.#viewSuperTienda.showLogOutModal(true, 'admin');
        this.#viewSuperTienda.showLoggedButton(false);
        this.#viewSuperTienda.showAdminButton(false);

    }
}
export default SuperTiendaController;