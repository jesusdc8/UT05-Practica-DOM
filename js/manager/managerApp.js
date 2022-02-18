import {SuperTienda} from './manager.js';
import { BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	InvalidValueException,
	AbstractClassException } from './manager.js';
import {Product, Category} from './manager.js';
import {Shop} from '../entities/shops.js';
import {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException} from './manager.js';
import  SuperTiendaView from './managerView.js';
import SuperTiendaController from './managerController.js';

$(function(){
	const superTiendaApp = new SuperTiendaController(
		SuperTienda.getInstance(), new SuperTiendaView()
	);
});


// const ManagerApp = new ManagerController(
// 	Manager.getInstance(), new ManagerView()
// 	);
// 	export default ManagerApp;