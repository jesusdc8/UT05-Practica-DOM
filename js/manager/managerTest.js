import SuperTienda from './manager.js';
// import Manager from './manager.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from './manager.js';
import {Product, Category} from './manager.js';
import {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException} from './manager.js';
// import {SortedMap} from './sortedmap.js';

let category1 = new Category('Promociones');
let category2 = new Category('Outlet');
let category4 = new Category('Reacondicionados');
category1.description = 'Productos en promoción.';
category2.description = 'Outlet de productos con grandes descuentos.';
category3.description = 'Ofertas actuales.';
category4.description = 'Productos reacondicionados o seminuevos.';
// let errorCategory = new Category('Reacondicionados');

let product1 = new Product(1, 'brand1', 'model1', 1100);
let product2 = new Product(2, 'brand11', 'model2', 1200);
let product3 = new Product(3, 'brand12', 'model3', 1300);
let product4 = new Product(4, 'brand13', 'model4', 1400);


function testCreateObjects(){
  let SuperTienda = SuperTienda.getInstance();

	// $$result.logBold("Testeo: Objetos categorias");
  SuperTienda.addCategory(category2, category1, category4);
//   try{
//     SuperTienda.addCategory(errorCategory);
//   } catch(error){
//     console.log(error.toString());
//   }
	// testListCategories();

	// $$result.logBold("Testeo: Objetos productos");
  SuperTienda.addProduct(product2, product3, product4, product5);
  SuperTienda.addProduct(product7, product8, product9, product10);
  SuperTienda.addProduct(product12, product13, product14, product15);
  SuperTienda.addProduct(product17, product18, product19, product20);
	// testListProducts();

  SuperTienda.addProductInCategory(category1, product1, product2, product3, product4, product5);
  SuperTienda.addProductInCategory(category2, product6, product7, product8, product9, product10);
  SuperTienda.addProductInCategory(category3, product11, product12, product13, product14, product15);
  SuperTienda.addProductInCategory(category4, product16, product17, product18, product19, product20);
	// testListProducts();

// 	$$result.logBold("Contenido del carrito");
//   $$result.log(SuperTienda.toString('<br>'));
}

// function testRemoveObjects(){
// 	let SuperTienda = SuperTienda.getInstance();

// 	// $$result.logBold("Test: Borrado de objetos");
// 	// $$result.logBold("Test: Borrado de productos");
// 	// $$result.log("Productos: p1 y p12");
// 	SuperTienda.removeProduct(product1, product12);
// 	// $$result.logBold("Test: Borrado de productos en categorías");
// 	// $$result.log("Productos: p2 y p3 en c1");
// 	// SuperTienda.removeProductInCategory(category1, product3, product2);
// 	// try{
// 	// 	SuperTienda.removeProductInCategory(category1, product19);
// 	// } catch(error){
// 	// 	console.log(error.toString());
// 	// }

// 	// $$result.logBold("Test: Borrado de categoría");
// 	// $$result.log("Categoría: c2");
// 	// SuperTienda.removeCategory(category2);

// 	try{
// 		SuperTienda.removeCategory(new Category('ErrorCategory', 'img/error.jpg'));
// 	} catch(error){
// 		console.log(error.toString());
// 	}

// 	$$result.logBold("Contenido del carrito");
// 	$$result.log(SuperTienda.toString('<br>'));
// }

// function testListObjects(){
// 	let SuperTienda = SuperTienda.getInstance();

// 	// $$result.logBold("Listado Laptop ordenado por brand");
// 	for (let product of SuperTienda.getTypeProducts(Laptop, 'brand')){
// 		// $$result.log(product.toString());
// 	}
// }

// function testListProducts(){
// 	let SuperTienda = SuperTienda.getInstance();

// 	$$result.logBold("Listado Productos");
// 	for (let product of SuperTienda.products){
// 		$$result.log(product.toString());
// 	}
// }

// function testListCategories(){
// 	let SuperTienda = SuperTienda.getInstance();

// 	$$result.logBold("Listado Categorías");
// 	for (let category of SuperTienda.categories){
// 		$$result.log(category.title);
// 	}
// }

// function testListOrderedProducts(){
// 	let SuperTienda = SuperTienda.getInstance();

// 	$$result.logBold("Listado productos ordenados por precio");
// 	let ordered = (productA, productB) => (productA[1].serial > productB[1].serial)? -1:1;
// 	for (let category of SuperTienda.categories){
// 		$$result.log(category.title);
// 		for (let product of SuperTienda.getCategoryProducts(category, ordered)){
// 			$$result.log(product.toString());
// 		}
// 	}
// }

// function testManager(){
// 	$$result.logBold("Testeo del Manager");
// 	testCreateObjects();
// 	testRemoveObjects();
// 	testListObjects();
// 	testListOrderedProducts();
// }

export {testManager};
