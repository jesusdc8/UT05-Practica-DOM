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
import BackupApp from './backupApp.js';

class SuperTiendaController {
    // Creamos los campos privados para el modelo y la vista
    #modelSuperTienda;
    #viewSuperTienda;
    #viewAuxPage;

    recuperarBackup(){
        console.log(this.#modelSuperTienda);

        $.ajax({
            type: "get",
            url: "http://localhost/cliente/Practica%20DOM/UT05-Practica-DOM/backups/base.json",
            dataType: "json",
            success: (response)=>{
                console.log(response);
                response.categories.forEach(category => {
                    console.log(category)
                    let title = category.title;
                        let description = category.description;
                        let image = category.image;
                    category.forEach(string => {
                        console.log(string.split(':'));
                        title = string.split(':')[1];
                        description = string.split(':')[1];
                        image = string.split(':')[2];
                        console.log(title, description, image)
                    });
                    // category.forEach((category)=>{
                        
                        this.#modelSuperTienda.addCategory(new Category(title, description, image));
                    // });    
        
        
        
                });
                this.response.smartphones.forEach(smartphone => {
                    let serial = smartphone.serial;
                    let brand = smartphone.brand;
                    let model = smartphone.model;
                    let price = smartphone.price;
                    let description = smartphone.description;
                    let band = smartphone.band;
                    let storage = smartphone.storage;
                    let color = smartphone.color;
        
                    this.#modelSuperTienda.addProduct(new Smartphone(serial, brand, model, price, description, band, storage, color));
        
                });
                this.response.laptops.forEach(laptop => {
                    let serial = laptop.serial;
                    let brand = laptop.brand;
                    let model = laptop.model;
                    let price = laptop.price;
                    let description = laptop.description;
                    let memory = laptop.memory;
                    let storage = laptop.storage;
        
                    this.#modelSuperTienda.addProduct(new Laptop(serial, brand, model, price, description, processor, memory, storage));
        
                });
        
                this.response.products.forEach(product => {
                    let serial = product.serial;
                    let brand = product.brand;
                    let model = product.model;
                    let price = product.price;
                    let description = product.description;
        
                    this.#modelSuperTienda.addProduct(new Product(serial, brand, model, price, description));
        
                });
                this.response.tvs.forEach(tv => {
                    let serial = tv.serial;
                    let brand = tv.brand;
                    let model = tv.model;
                    let price = tv.price;
                    let inches = tv.inches;
                    let smart = tv.smart;
        
                    this.#modelSuperTienda.addProduct(new Tv(serial, brand, model, price, description, inches, smart));
        
                });
                this.response.shops.forEach(shop => {
                    let id = shop.id;
                    let address = shop.address;
                    let city = shop.city;
                    let country = shop.country;
                    let image = shop.image;
        
                    this.#modelSuperTienda.addShop(new Shop(id, address, city, country, image));
        
                });
            }
        });        
        
        
    }

    createBackup(){        
        let objeto = {};
        let categories = [];
        let smartphones = [];
        let laptops = [];
        let products = [];
        let tvs = [];
        let shops = [];

        for (let category of this.#modelSuperTienda.categories){
            categories.push((category.toString()).split(','));
        }
        for (let smartphone of this.#modelSuperTienda.products){
            if (smartphone instanceof Smartphone){
                smartphones.push((smartphone.toString()).split(','));
            }
        }
        for (let laptop of this.#modelSuperTienda.products){
            if (laptop instanceof Laptop){
                laptops.push((laptop.toString()).split(','));
            }
        }
        for (let product of this.#modelSuperTienda.products){
            if ( !(product instanceof Smartphone) && !(product instanceof Laptop) && !(product instanceof Tv)){
                products.push((product.toString()).split(','));
            }
        }
        for (let tv of this.#modelSuperTienda.products){
            if (tv instanceof Tv){
                tvs.push((tv.toString()).split(','));
            }
        }
        for (let shop of this.#modelSuperTienda.shops){
            if (shop instanceof Shop){
                shops.push((shop.toString()).split(','));
            }
        }
        
        objeto.categories = categories;
        objeto.smartphones = smartphones;
        objeto.laptops = laptops;
        objeto.products = products;
        objeto.tvs = tvs;
        objeto.shops = shops;

        console.log(JSON.stringify(objeto));
        let main = $(`main`);
        main.empty();

        let vfPostFile = $('#vfPostFile');
        let base = location.protocol + '//' + location.host + location.pathname + 'backups';
        console.log(base);
        let url = new URL('submitForm.php', base);
        let formData = new FormData();
        // formData.append([JSON.stringify(objeto)]);
        formData.append('results', '8');
        formData.append('gender', 'female');
        formData.append('webmasterfile', vfPostFile.get(0).files[0]);
        let product = {
        id: 123,
        name: 'PC',
        brand: 'HP',
        model: 'EliteBook'
        }
        let blob = new Blob([JSON.stringify(objeto)], { type: "text/xml"});
        formData.append("blobField", blob);
        formData.append("objeto", [JSON.stringify(objeto)]);
        fetch(url, {
            method: 'post',
            body: formData
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                console.dir(data);
            // 
            }).catch(function(err) {
            console.log('No se ha recibido respuesta.');
            });
            // console.log(JSON.stringify(objeto));

            var request = new XMLHttpRequest();
            request.open("POST", url, true);
            // request.send(base);
            request.send(formData);

            let myJson = JSON.stringify(objeto);
            fetch('http://localhost/cliente/Practica%20DOM/UT05-Practica-DOM/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: myJson,
            })


            // Creating a XHR object
            let xhr = new XMLHttpRequest();
            let url2 = "submit.php";
        
            // open a connection
            xhr.open("POST", url2, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
  
                    // Print received data from server
                    result.innerHTML = this.responseText;

                }
            };
            }  

    #loadSuperTiendaObjects = () => {
        
        testAddObjects();
        // this.recuperarBackup();
        // this.createBackup();
        
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