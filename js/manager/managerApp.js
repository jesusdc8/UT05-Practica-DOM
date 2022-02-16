import SuperTienda from './managerModel.js';
import  SuperTiendaView from './managerView.js';
import SuperTiendaController from './managerController.js';

$(function(){
	const superTiendaApp = new SuperTiendaController(
		SuperTienda.getInstance(), new SuperTiendaView()
	);
});
