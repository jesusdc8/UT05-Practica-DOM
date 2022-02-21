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
      <img src="${shop.image}" class="card-img-top mt-3 rounded" alt="..." style=" height: 13rem">
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
        <a href="#" class="btn btn-primary">Ver tienda</a>
      </div>
    </div>`);
    }
      
  }

  loadDropdowns(){
      let superTienda = SuperTienda.getInstance();
      let shopMenu = $('#dropdown-menu-shops');
      let categoryMenu = $('#dropdown-menu-categories');

      for (let shop of superTienda.shops){
          shopMenu.append(`<li><a class="dropdown-item" href="#" value="${shop.id}">${shop.city}</a></li>`);
      }

      for (let category of superTienda.categories){
          categoryMenu.append(`<li><a class="dropdown-item" href="#">${category.title}</a></li>`);
      }

      let manejador = $('#dropdown-menu-shops').find('a').click( (event) => { 
        // alert(event.target.attributes.value.value);
        this.loadShop(event.target.attributes.value.value);        
      });

  }

  init() {
      testManager();
      this.main.empty();
      this.displayShops();
      this.loadDropdowns();
      
  }

  loadShop(shopId){
    // console.log(shopId)   
    let superTienda = SuperTienda.getInstance();
    let shop = superTienda.findShop(parseInt(shopId));
    // console.log(superTienda.findShop(parseInt(shopId)));
    // console.log(shop);
    this.main.empty();
    this.main.append(`<div class="container px-4 py-5 mt-3"><h2 class="pb-2 border-bottom">Información sobre la Tienda</h2>
    <div class="e" style="background-color: ; float: left; ">
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Plaza_Mayor_de_Madrid_06.jpg" alt="" class="shop-img m-3 rounded">
      
    </div>
    <h3 class="m-3">Madrid</h3>
    <ul class="list-group">
      <li class="list-group-item active" aria-current="true">
        Identificador : ${shop.shop.id}
      </a>
      <li class="list-group-item">Dirección: ${shop.shop.address}</a>
      <li class="list-group-item">País: ${shop.shop.country}</a>
  </div>
</div>`);     
  }

    


}

export default SuperTiendaView;