import {SuperTienda} from './manager.js';
import { testManager } from './managerTest.js';
import AuxPageApp from './auxPageApp.js';

class SuperTiendaView {
 #auxPageApp = AuxPageApp.getInstance();

 
  // #opened = new Map();

  //Añadimos la función privada para comunicarnos con el controlador
  #excecuteHandler(handler, handlerArguments, scrollElement, data, url, event){
		handler(...handlerArguments);
		$(scrollElement).get(0).scrollIntoView();
    // console.log("estado: "+history.state);
    // console.log("data: "+data);
    history.pushState(data, null, url);
		event.preventDefault();
	}

  #excecuteHandlerOffHistory(handler, handlerArguments, event){
		handler(...handlerArguments);
		event.preventDefault();
	}

  //añadimos los elementos del html
  constructor(){
    this.main = $('main');
    this.shopMenu = $('#dropdown-menu-shops');
    this.categoryMenu = $('#dropdown-menu-categories');
  }

  bindInit(handler){
      $('#init').click((event) => {
        this.#excecuteHandler(handler, [], 'body', {page:'inicio'}, '', event);
      });
  
      $('#logo').click((event) => {
        this.#excecuteHandler(handler, [], 'body', {page: 'inicio'}, '', event);
      });
	}

  displayShops(shops) {
    this.main.empty();
    
    this.main.append(`<div class="container px-4 py-5 mt-3" id="custom-cards"><h2 class="pb-2 border-bottom">Tiendas Disponibles</h2><div class="row row-cols-1 row-cols-md-3  g-4 "><section style='display:none' id="shop-card">`);
    let cards = $('#shop-card');
    for (let shop of shops){
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
        <a class="btn btn-primary" value="${shop.id}">Ver tienda</a>
      </div>
    </div>`);
    }
      
  }

  loadDropdowns(shops, categories){
    this.shopMenu.empty();
    this.categoryMenu.empty();

      for (let shop of shops){
          this.shopMenu.append(`<li><a class="dropdown-item pointer" value="${shop.id}">${shop.city}</a></li>`);
      }

      for (let category of categories){
        this.categoryMenu.append(`<li><a class="dropdown-item pointer" value="${category.title}">${category.title}</a></li>`);
      }
  }

  bindShop(handler){
    $('#dropdown-menu-shops').find('a').click( (event) => { 
      let shop = event.target.attributes.value.value;      
      
      this.#excecuteHandler(
				handler, [shop],
				'body',
				{page:'shop', shop:shop},
				'', event
				);
    });

    $('#custom-cards').find('a').click( (event) => { 
      let shop = event.target.attributes.value.value;      

      this.#excecuteHandler(
				handler, [shop],
				'body',
				{page:'shop', shop:shop},
				'', event
				);
    });
  }

  bindCategory(handler){
    $('#dropdown-menu-categories').find('a').click( (event) => { 
      let link = event.target.attributes.value.value;      
      this.#excecuteHandler(
				handler, [link],
				'body',
				{page: 'category', category: link},
				'', event
				);
    });
  }

  loadShop(shop, categories){
    this.main.empty();
    this.main.append(`<div class="container px-4 py-5 mt-3" id='shop-info'>
    <h2 class="pb-2 border-bottom">Información sobre la Tienda</h2>
    <div class="e" style="background-color: ; float: left; ">
      <img src="${shop.shop.image}" alt=""
        class="shop-img m-3 rounded">

    </div>
    <h3 class="m-3">${shop.shop.city}</h3>
    <ul class="list-group">
      <li class="list-group-item active" aria-current="true">
        Identificador : ${shop.shop.id}
        </a>
      <li class="list-group-item">Dirección: ${shop.shop.address}</a>
      <li class="list-group-item">País: ${shop.shop.country}</a>
    </ul>
    </div>`);

    
    $('#shop-info').after(`<div class="container">
    <h3 class="m-3 border-bottom">Productos</h3>
      <div class="container m-3" id='products-shop'>

      </div>
    </div>`);

    // console.log(shop.instanceOf(Shop));
    let i = 0;
    for (let category of categories){
      $('#products-shop').append(`<h3 id='h3'>${category.category.title}</h3><div class='container'>`);
      $('#products-shop').has('div').eq(i).append(`
        <ul class="list-group list-group-horizontal product-table">
          <li class="list-group-item active">Serial</li>
          <li class="list-group-item active">Marca</li>
          <li class="list-group-item active">Modelo</li>
          <li class="list-group-item active">Precio</li>
          <li class="list-group-item active">Descripción</li>
          <li class="list-group-item active">Ver Producto</li>
        </ul>
      `);
      for (let [key, value] of category.products) {
        if (shop.products.has(value.serial)){
          $('.product-table').after(`
          <ul class="list-group list-group-horizontal ">
            <li class="list-group-item flex-fill">${value.serial}</li>
            <li class="list-group-item flex-fill">${value.brand}</li>
            <li class="list-group-item flex-fill">${value.model}</li>
            <li class="list-group-item flex-fill">${value.price}</li>
            <li class="list-group-item flex-fill">${value.description}</li>
            <li class="list-group-item flex-fill"><button type="button" id='${value.serial}' class="btn btn-outline-primary btn-product"><i class="bi bi-box-arrow-up-right"></i></button></li>

          </ul>
          `);
        }
        
      }     
      $('.product-table').removeClass('product-table');       
    }
    $('.btn-product').click((event) => { 
      this.displayProductInfo(event.currentTarget.id);      
      event.preventDefault();
    });
  }

  displayProductInfo(serial){
    this.#auxPageApp.newWindow(serial);
  }

  loadCategory(category, products){
    this.main.empty();
    this.main.append(`<div class="container px-4 py-5 mt-3" id='shop-info'>
    <h2 class="pb-2 border-bottom">Información sobre la Categoría</h2>
    <div class="e" style="background-color: ; float: left; ">
      <img src="${category.category.image}" alt=""
        class="shop-img m-3 rounded">

    </div>
    <h3 class="m-3">${category.category.title}</h3>
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Descripción</h5>
        <p class="card-text">${category.category.description}.</p>
      </div>
    </div>
    </div>`);

    
    $('#shop-info').after(`<div class="container">
    <h3 class="m-3 border-bottom">Productos</h3>
      <div class="container m-3" id='products-shop'>

      </div>
    </div>`);
    let i = 0;
    $('#products-shop').append(`<h3 id='h3'>${category.category.title}</h3><div class='container'>`);
      $('#products-shop').has('div').eq(i).append(`
        <ul class="list-group list-group-horizontal product-table">
          <li class="list-group-item active">Serial</li>
          <li class="list-group-item active">Marca</li>
          <li class="list-group-item active">Modelo</li>
          <li class="list-group-item active">Precio</li>
          <li class="list-group-item active">Descripción</li>
          <li class="list-group-item active">Ver Producto</li>
        </ul>
      `);
    for (let product of products){
      for (let [key, value] of category.products) {
          $('.product-table').after(`
          <ul class="list-group list-group-horizontal " id=buenas>
            <li class="list-group-item flex-fill">${value.serial}</li>
            <li class="list-group-item flex-fill">${value.brand}</li>
            <li class="list-group-item flex-fill">${value.model}</li>
            <li class="list-group-item flex-fill">${value.price}</li>
            <li class="list-group-item flex-fill">${value.description}</li>
            <li class="list-group-item flex-fill"><button type="button" id='${value.serial}' class="btn btn-outline-primary btn-product"><i class="bi bi-box-arrow-up-right"></i></button></li>
          </ul>
          `);
      }     
        $('.product-table').removeClass('product-table');
    }
    $('.btn-product').click((event) => { 
      this.displayProductInfo(event.currentTarget.id);      
      event.preventDefault();
    });
  }
}

export default SuperTiendaView;