import SuperTienda from './managerModel.js';

class SuperTiendaView {

    //añadimos el elemento main del html
    constructor(){
        this.main = $('main');
    }

    init() {
        this.main.empty();
        this.main.append(`<p>Hola mundo</p>`);
    }
}

export default SuperTiendaView;