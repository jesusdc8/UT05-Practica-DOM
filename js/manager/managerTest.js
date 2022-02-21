import {SuperTienda} from './manager.js';
import { Product, Shop, Category } from './manager.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from './manager.js';

import {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException} from './manager.js';

let category1 = new Category('Moviles');
let category2 = new Category('Portatiles');
let category3 = new Category('Sobremesa');
let category4 = new Category('Televisores');

category1.description = 'Telefonos móviles.';
category2.description = 'Ordenadores portátiles';
category3.description = 'Ordenadores sobremesa.';
category4.description = 'Televisores de todos los tamaños';

let product1 = new Product(1, 'Samsung', 'Galaxy s21', 1100);
let product2 = new Product(2, 'Apple', 'Iphone 12 Pro', 1200);
let product3 = new Product(3, 'Xiaomi', 'Mi 11', 500);
let product4 = new Product(4, 'Apple', 'Iphone 11', 900);

let product5 = new Product(5, 'Acer', 'Aspire', 500);
let product6 = new Product(6, 'HP', 'Pavilion', 1000);
let product7 = new Product(7, 'MSI', 'Ultra', 1300);
let product8 = new Product(8, 'HP', 'UltraBook', 1000);

let product9 = new Product(9, 'HP', 'OMEN', 1100);
let product10 = new Product(10, 'SuperTienda', 'Ultra', 1200);
let product11 = new Product(11, 'SuperTienda', 'Mega', 1300);
let product12 = new Product(12, 'HP', 'Gaming', 1400);

let product13 = new Product(13, 'Lg', 'Oled', 1800);
let product14 = new Product(14, 'Samsung', 'Qled', 1200);
let product15 = new Product(15, 'Lg', 'NanoCell', 1300);
let product16 = new Product(16, 'Lg', '4k', 1400);

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

function testManager(){
	console.log("Testeo del Manager");
	testCreateObjects();
  testListProducts();
  testListShops();
testListCategories()
}

export {testManager};
