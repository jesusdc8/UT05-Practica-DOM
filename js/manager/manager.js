import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from '../exceptions.js';
import {Product, Category, Laptop, Smartphone, Tv} from '../entities/products.js';
import {Shop} from '../entities/shops.js';

class ManagerException extends BaseException {
	constructor (message = 'Error: Manager Exception.', fileName, lineNumber){
			super(message, fileName, lineNumber);
			this.name = 'ManagerException';
	}
}

class ObjecManagerException extends ManagerException {
  constructor (param, className, fileName, lineNumber){
    super(`Error: The ${param} is not a ${className}`, fileName, lineNumber);
    this.param = param;
    this.param = className;
    this.name = 'ObjecManagerException';
  }
}

class CategoryExistsException extends ManagerException {
  constructor (category, fileName, lineNumber){
    super(`Error: The ${category.title} already exists in the manager.`, fileName, lineNumber);
    this.category = category;
    this.name = 'CategoryExistsException';
  }
}

class ShopExitsException extends ManagerException {
  constructor (shop, fileName, lineNumber){
    super(`Error: The ${shop.id} already exists in the manager.`, fileName, lineNumber);
    this.shop = shop;
    this.name = 'ShopExitsException';
  }
}

class ProductExistsException extends ManagerException {
  constructor (product, fileName, lineNumber){
    super(`Error: The ${product.serial} already exists in the manager.`, fileName, lineNumber);
    this.product = product;
    this.name = 'ProductExistsException';
  }
}

class ProductExistInCategoryException extends ManagerException {
  constructor (product, category, fileName, lineNumber){
    super(`Error: The ${product.serial} already exist in ${category.title}.`, fileName, lineNumber);
    this.category = category;
    this.product = product;
    this.name = 'ProductExistInCategoryException';
  }
}

class ProductExistInShopException extends ManagerException {
  constructor (product, shop, fileName, lineNumber){
    super(`Error: The ${product.serial} already exist in ${shop.id}.`, fileName, lineNumber);
    this.shop = shop;
    this.product = product;
    this.name = 'ProductExistInShopException';
  }
}

class CategoryNotExistException extends ManagerException {
  constructor (category, fileName, lineNumber){
    super(`Error: The ${category} doesn't exist in the manager.`, fileName, lineNumber);
    this.category = category;
    this.name = 'CategoryNotExistException';
  }
}

class ShopNotExistException extends ManagerException {
  constructor (shop, fileName, lineNumber){
    super(`Error: The ${shop} doesn't exist in the manager.`, fileName, lineNumber);
    this.shop = shop;
    this.name = 'ShopNotExistException';
  }
}

class ProductNotExistInManagerException extends ManagerException {
  constructor (product, fileName, lineNumber){
    super(`Error: The ${product.serial} doesn't exist in the manager.`, fileName, lineNumber);
    this.product = product;
    this.name = 'ProductNotExistInManagerException';
  }
}

class ProductNotExistInCategoryException extends ManagerException {
  constructor (product, category, fileName, lineNumber){
    super(`Error: The ${product.serial} doesn't exist in ${category.title}.`, fileName, lineNumber);
    this.category = category;
    this.product = product;
    this.name = 'ProductNotExistInCategoryException';
  }
}

let SuperTienda = (function () {
    let instantiated;

    function init() {
      //Inicialización del Singleton
      class SuperTienda {
        
          #categories = new Map();
			    #products = new Map();
          #shops = new Map();

          constructor(){

          }
        

        addCategory(){
          for (let category of arguments){
            if (!(category instanceof Category)) { //validamos que el argumento sea un obj category
              throw new ObjecManagerException ('category', 'Category');
            }
            if (!this.#categories.has(category.title)){ //Validamos que no exista ya esa categoria
              this.#categories.set(category.title, {
                category: category,
                products: new Map() //inicializamos un mapa de productos de esa categoria
              });
            } else {
              throw new CategoryExistsException(category);
            }
          }
          return this;
        }

        addShop(){
          for (let shop of arguments){
            if (!(shop instanceof Shop)) { //validamos que el argumento sea un obj category
              throw new ObjecManagerException ('shop', 'Shop');
            }
            if (!this.#shops.has(shop.id)){ //Validamos que no exista ya esa categoria
              this.#shops.set(Number.parseInt(shop.id), {
                shop: shop,
                products: new Map() //inicializamos un mapa de productos de esa categoria
              });
            } else {
              throw new ShopExitsException(shop);
            }
          }
          return this;
        }

        addProduct(){
          for (let product of arguments){
            if (!(product instanceof Product)) {//validamos que el argumento sea un obj product
              throw new ObjecManagerException ('product', 'Product');
            }
            if (!this.#products.has(product.serial)){ //Validamos que no exista ya ese producto
              this.#products.set(product.serial, product);
            } else {
              throw new ProductExistsException(product);
            }
          }
          return this;
        }

        addProductInCategory (category){
          if (!(category instanceof Category)) { //validamos que el argumento sea un obj category
            throw new ObjecManagerException ('category', 'Category');
          }
          if (!this.#categories.has(category.title)){ //Validamos que no exista esa categoria
            this.addCategory(category);
          }
  
          let storedCategory = this.#categories.get(category.title);
          for (let i = 1; i < arguments.length; i++){ //añadimos tantos productos como nos vengan en el argumento
            let product = arguments[i]; 
            if (!(product instanceof Product)) { //Validamos que el objeto sea de tipo product
              throw new ObjecManagerException ('product', 'product');
            }
            if (!this.#products.has(product.serial)){
              this.addProduct(product);
            }
            let storedProduct = this.#products.get(product.serial);
            if (!storedCategory.products.has(product.serial)){ //Validamos que el produto no esté ya en la categoria
              storedCategory.products.set(product.serial, storedProduct); //Añadimos el producto en el map de la categoria
            } else {
              throw new ProductExistInCategoryException(product, category);
            }
          }
          return this;
        }

        addProductInShop (shop){
          if (!(shop instanceof Shop)) {
            throw new ObjecManagerException ('shop', 'Shop');
          }
          if (!this.#shops.has(shop.id)){
            this.addShop(shop);
          }
  
          let storedShop = this.#shops.get(shop.id);
          for (let i = 1; i < arguments.length; i++){
            let product = arguments[i];
            if (!(product instanceof Product)) {
              throw new ObjecManagerException ('product', 'product');
            }
            if (!this.#products.has(product.serial)){
              this.addProduct(product);
            }
            let storedProduct = this.#products.get(product.serial);
            if (!storedShop.products.has(product.serial)){
              storedShop.products.set(product.serial, storedProduct);
            } else {
              throw new ProductExistInShopException(product, shop);
            }
          }
          return this;
        }

        get categories(){
          // referencia para habilitar el closure en el objeto
          let values = this.#categories.values();
          return {
            * [Symbol.iterator](){
              for (let storedCategory of values){
                yield storedCategory.category;
              }
            }
          }
        }
        get shops(){
          // referencia para habilitar el closure en el objeto
          let values = this.#shops.values();
          return {
            * [Symbol.iterator](){
              for (let storedShop of values){
                yield storedShop.shop;
              }
            }
          }
        }
  
        //Devuelve un iterator de los productos
        get products(){
          // referencia para habilitar el closure en el objeto
          let values = this.#products.values();
          return {
            * [Symbol.iterator](){
              for (let product of values){
                yield product;
              }
            }
          }
        }

        findCategory(category){
          
          if (this.#categories.has(category)){
            return this.#categories.get(category);
          } else {
            throw new CategoryNotExistException(category);
          }
        }

        //Obtiene los productos de una categoria al pasarle un obj category
        * getCategoryProducts(category, ordered){
          if (!(category instanceof Category)) {
            throw new ObjecManagerException ('category', 'Category');
          }
          if (this.#categories.has(category.title)){
            let storedCategory = this.#categories.get(category.title);
            let values = (ordered)? storedCategory.products.values(ordered) : storedCategory.products.values();
            for (let product of values){
              yield product;
            }
          } else{
            throw new CategoryNotExistException(category);
          }
        }

        //Obtiene los productos de una categoria al pasarle EL TÍTULO DE UNA CATEGORIA
        * getCategoryProductsByTitle(category){
          if (this.#categories.has(category)){
            let storedCategory = this.#categories.get(category);
            let values = (ordered)? storedCategory.products.values(ordered) : storedCategory.products.values();
            for (let product of values){
              yield product;
            }
          } else{
            throw new CategoryNotExistException(category);
          }
        }

        * getShopProducts(shop){
          if (!(shop instanceof Shop)) {
            throw new ObjecManagerException ('shop', 'Shop');
          }
          if (this.#shops.has(shop.id)){
            let storedShop = this.#shops.get(shop.id);
            let values = storedShop.products.values();
            for (let product of values){
              yield product;
            }
          } else{
            throw new ShopNotExitsException(shop);
          }
        }

        //obtiene la categoria de un producto si esque este tiene alguna asignada
        getCategoryProduct(product){
          if (!(product instanceof Product)) {
            throw new ObjecManagerException ('product', 'Product');
          }
          for (let [key, value] of this.#categories) {
            if (value.products.has(product.serial)){
              return value;
            }
          }
        }

        * getShopCategories(shop){
          if (!(shop instanceof Shop)) {
            throw new ObjecManagerException ('shop', 'Shop');
          }
          if (this.#shops.has(shop.id)){
            //recuperamos los productos de shop
            let categories = new Set();
            let storedShop = this.#shops.get(shop.id);
            let values = storedShop.products.values();
            for (let product of values){
              if (!categories.has(this.getCategoryProduct(product))){
                categories.add(this.getCategoryProduct(product));

                yield this.getCategoryProduct(product);
              }
              
              
            }           
          
          } else{
            throw new ShopNotExitsException(shop);
          }
        }



        addProductInShop (shop){
          if (!(shop instanceof Shop)) { //validamos que el argumento sea un obj category
            throw new ObjecManagerException ('shop', 'Shop');
          }
          if (!this.#shops.has(shop.id)){ //Validamos que no exista ya esa categoria
            this.addShop(shop);
          }
  
          let storedShop = this.#shops.get(shop.id);
          for (let i = 1; i < arguments.length; i++){ //añadimos tantos productos como nos vengan en el argumento
            let product = arguments[i]; 
            if (!(product instanceof Product)) { //Validamos que el objeto sea de tipo product
              throw new ObjecManagerException ('product', 'product');
            }
            if (!this.#products.has(product.serial)){
              this.addProduct(product);
            }
            let storedProduct = this.#products.get(product.serial);
            if (!storedShop.products.has(product.serial)){ //Validamos que el produto no esté ya en la categoria
              storedShop.products.set(product.serial, storedProduct); //Añadimos el producto en el map de la categoria
            } else {
              throw new ProductExistInShopException(product, shop);
            }
          }
          return this;
        }

        get shops(){
          // alert()
          let values = this.#shops.values();
          return {
            * [Symbol.iterator](){
              for (let storedShop of values){
                yield storedShop.shop;
              }
            }
          }
        }      

        getProduct(serial){
          return this.#products.get(serial);
        }

        findShop(shopId){
          return this.#shops.get(Number.parseInt(shopId));
        }

        deleteProduct(){
          for (let serial of arguments){
            if (this.#products.has(serial)){ 
              this.#products.delete(serial);
            } else {
              console.log(serial);
              console.log(this.#products);
              throw new ProductNotExistInManagerException(serial);
            }
          }
          return this;
        }

        deleteCategory(){
          for (let category of arguments){
            if (this.#categories.has(category)){ 
              this.#categories.delete(category);
            } else {
              throw new CategoryNotExistException(category);
            }
          }
          return this;
        }

        deleteShop(){
          for (let shop of arguments){
            if (this.#shops.has(Number.parseInt(shop))){ 
              this.#shops.delete(Number.parseInt(shop));
            } else {
              throw new ShopNotExistException(shop);
            }
          }
          return this;
        }

        deleteProductInShop(){
          for (let serial of arguments){
            for (let shop of this.#shops.values()){
              if (shop.products.has(serial)){ 
                shop.products.delete(serial);
              } 
            }
          }
          return this;
        }

        deleteProductInCategory(){
          for (let serial of arguments){
            for (let category of this.#categories.values()){
              if (category.products.has(serial)){ 
                category.products.delete(serial);
              } 
            }
          }
          return this;
        }
      }

      Object.defineProperty(SuperTienda.prototype, 'categories', {enumerable: true});
      Object.defineProperty(SuperTienda.prototype, 'products', {enumerable: true});
      Object.defineProperty(SuperTienda.prototype, 'shops', {enumerable: true});

      let superTienda = new SuperTienda();
      Object.freeze(superTienda);
      return superTienda;
    }
    return {
      getInstance: function () {
        if (!instantiated) {
          instantiated = init();
        }
        return instantiated;
      }
    };
  })();

  
export {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException};
export {BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from '../exceptions.js';
export {Product, Category, Laptop, Smartphone, Tv} from '../entities/products.js';
export {Shop} from '../entities/shops.js';
export {SuperTienda};