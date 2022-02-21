import {SuperTienda} from './manager.js';
import { testManager } from './managerTest.js';

class SuperTiendaView {

  //añadimos el elemento main del html
  constructor(){
      this.main = $('main');
  }

  displayShops() {
      let superTienda = SuperTienda.getInstance();
      
      this.main.append(`<div class="container px-4 py-5 mt-3" id="custom-cards"><h2 class="pb-2 border-bottom">Tiendas Disponibles</h2><div class="row row-cols-1 row-cols-md-3  g-4 "><section style='display:none' id="shop-card">`);
      let cards = $('#shop-card');
      for (let shop of superTienda.shops){
          cards.after(`<div class="card m-3 mt-5" style="width: 18rem;">
          <img src="${shop.image}" class="card-img-top" alt="..." style=" height: 13rem">
          <div class="card-body">
            <h5 class="card-title">${shop.city}</h5>
            <p class="card-text">Nuestra tienda situada en ${shop.city}</p>
          </div>
          <ul class="list-group list-group-flush" style="width: auto;">
            <li class="list-group-item">${shop.address}</li>
            <li class="list-group-item">${shop.country}</li>
            <li class="list-group-item">${shop.id}</li>
          </ul>
          <div class="card-body">
            <a href="#" class="btn btn-primary disabled">Ver tienda</a>
          </div>
        </div>`);
      }
      
  }

  loadDropdowns(){
      let superTienda = SuperTienda.getInstance();
      let shopMenu = $('#dropdown-menu-shops');
      let categoryMenu = $('#dropdown-menu-categories');
      let shopsLiks = [];

      for (let shop of superTienda.shops){
          shopMenu.append(`<li><a class="dropdown-item" id="shop-link-${shop.id}" href="#">${shop.city}</a></li>`);
          shopsLiks.push($('#shop-link-shop-'+shop.id));
      }

      for (let category of superTienda.categories){
          categoryMenu.append(`<li><a class="dropdown-item" href="#">${category.title}</a></li>`);
      }


  }

  init() {
      testManager();
      this.main.empty();
      this.displayShops();
      this.loadDropdowns();
      
  }

  loadShop(shop){
      this.main.empty();

      this.main.append(`<div class="list-group">
      <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
        ${shop.city}
      </a>
      <a href="#" class="list-group-item list-group-item-action">A second link item</a>
      <a href="#" class="list-group-item list-group-item-action">A third link item</a>
      <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
      <a class="list-group-item list-group-item-action disabled">A disabled link item</a>
    </div>`);     
  }

    


}

export default SuperTiendaView;