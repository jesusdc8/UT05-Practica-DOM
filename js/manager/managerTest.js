import {SuperTienda} from './manager.js';
import { Product, Shop, Category, Laptop, Smartphone, Tv } from './manager.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from './manager.js';

import {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException} from './manager.js';

let category1 = new Category('Ultima Tecnologia', 'La tecnología más nueva');
let category2 = new Category('Ordenadores', 'Todos nuestros ordenadores');
let category3 = new Category('Gaming', 'Productos enfocados al gaming');
let category4 = new Category('Estudiantes', 'Los mejores productos para los más estudiosos');

category1.description = 'Telefonos móviles.';
category2.description = 'Ordenadores portátiles';
category3.description = 'Ordenadores sobremesa.';
category4.description = 'Televisores de todos los tamaños';

let product1 = new Smartphone(1, 'Samsung', 'Galaxy s21', 1100, "Último Samsung", '5G', '256gb', 'black');
let product2 = new Smartphone(2, 'Apple', 'Iphone 12 Pro', 1200, "El mejor Iphone", '5G', '128gb', 'white');
let product3 = new Smartphone(3, 'Xiaomi', 'Mi 11', 500, "Xiaomi calidad precio", '5G', '256gb', 'black');
let product4 = new Smartphone(4, 'Apple', 'Iphone 11', 900, "Iphone normal", '4G', '128gb', 'rose');

let product5 = new Laptop(5, 'Acer', 'Aspire', 500, 'Lo mejor para ofimática', 'Intel i3 5400', '8gb', '500gb');
let product6 = new Laptop(6, 'HP', 'Pavilion', 1000, 'Lo mejor para estudiantes', 'Intel i5 5400', '8gb', '500gb');
let product7 = new Laptop(7, 'MSI', 'Ultra', 1300, 'Lo mejor para gamers', 'Intel i7 5400', '16gb', '1tb');
let product8 = new Laptop(8, 'HP', 'UltraBook', 1000, 'Lo mejor para viajar', 'Intel i5 5400', '16gb', '500gb');

let product9 = new Product(9, 'HP', 'OMEN', 1100, 'Sobremesa de HP');
let product10 = new Product(10, 'SuperTienda', 'Ultra', 1200, 'Sobremesa montado por nosotros mismos');
let product11 = new Product(11, 'SuperTienda', 'Mega', 1300, 'Sobremesa montado por nosotros mismos');
let product12 = new Product(12, 'HP', 'Gaming', 1400, 'Sobremesa de HP para gaming');

let product13 = new Tv(13, 'Lg', 'Oled', 1800, 'Negros más puros', '55', true);
let product14 = new Tv(14, 'Samsung', 'Qled', 1200, 'Lo mejor de Samsung', '55', true);
let product15 = new Tv(15, 'Lg', 'NanoCell', 1300, 'Última tecnologia', '60', true);
let product16 = new Tv(16, 'Lg', '4k', 1400, 'Iniciación en alta resolución', '50', true);

let shop1 = new Shop(1, 'Calle falsa 123','Madrid','Spain','https://upload.wikimedia.org/wikipedia/commons/4/44/Plaza_Mayor_de_Madrid_06.jpg');
let shop2 = new Shop(2, 'Calle de la concepción 4','Barcelona','Spain','https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/4d/45/49/province-of-barcelona.jpg?w=700&h=500&s=1');
let shop3 = new Shop(3, 'Calle verde s/n','Valencia','Spain','https://www.teacheracademy.eu/wp-content/uploads/2021/09/teacher-training-valencia.jpg');
// let shop4 = new Shop(4, 'Calle ventana s/n','florida','Estados unidos','https://blog-eeuu.com/wp-content/uploads/2013/09/florida.jpg');


function testCreateObjects(){
  let superTienda = SuperTienda.getInstance();

  superTienda.addCategory(category2, category1, category3, category4);
  superTienda.addShop(shop1, shop2, shop3);

  superTienda.addProduct(product2, product3, product4, product5, product6);
  superTienda.addProduct(product7, product8, product9, product10);
  superTienda.addProduct(product12, product13, product14, product15);
  superTienda.addProduct(product16, product11);

  superTienda.addProductInCategory(category1, product1, product2, product3, product4);
  superTienda.addProductInCategory(category2, product5, product6, product7, product8);
  superTienda.addProductInCategory(category3, product9, product10, product11, product12);
  superTienda.addProductInCategory(category4, product13, product14, product15, product16);

  superTienda.addProductInShop(shop1, product1, product3, product5, product7);
}

function testListProducts(){
  console.log("Listado Products")
	let superTienda = SuperTienda.getInstance();

  for ( let product of superTienda.products){
    console.log(product.toString());
  }
}

function testListCategories(){
	let superTienda = SuperTienda.getInstance();

	console.log("Listado Categorías");
	for (let category of superTienda.categories){
		console.log(category.title);
	}
}

function testListShops(){
	let superTienda = SuperTienda.getInstance();

	console.log("Listado Tiendas");
	for (let shop of superTienda.shops){
		console.log(shop.city);
	}
}

function testListProductsInShop(shop){
  let superTienda = SuperTienda.getInstance();

  console.log('Viendo productos de la tienda');
  for (let product of superTienda.getShopProducts(shop)){
    console.log(product);
  }
  

}

function testGetCategoryOfProduct(){
  let superTienda = SuperTienda.getInstance();
  console.log('Opteniendo la categoria asignada a un producto');

  console.log(superTienda.getCategoryProduct(product1));
}

function testGetShopCategories (){
  let superTienda = SuperTienda.getInstance();
  console.log('Opteniendo las categorias de una tienda');

  for (let category of superTienda.getShopCategories(shop1)){
    console.log('La tienda ' + shop1.city + 'contiene la categoria ' + category);
  }
}

function testManager(){
	console.log("Testeo del Manager");
	testCreateObjects();
  testListProducts();
  testListShops();
  testListCategories()
  testListProductsInShop(shop1);
  testGetCategoryOfProduct();
  testGetShopCategories();
}

export {testManager};
