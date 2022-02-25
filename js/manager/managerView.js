import {SuperTienda} from './manager.js';
import { testManager } from './managerTest.js';

class SuperTiendaView {

  //Añadimos la función privada para comunicarnos con el controlador
  #excecuteHandler(handler, handlerArguments, scrollElement, data, url, event){
		handler(...handlerArguments);
		$(scrollElement).get(0).scrollIntoView();
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
			this.#excecuteHandler(handler, [], 'body', {action: 'init'}, '#', event);
		});

		$('#logo').click((event) => {
			this.#excecuteHandler(handler, [], 'body', {action: 'init'}, '#', event);
		});
	}

  displayShops(shops) {
    
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
        <a href="#" class="btn btn-primary" value="${shop.id}">Ver tienda</a>
      </div>
    </div>`);
    }
      
  }

  loadDropdowns(shops, categories){

      for (let shop of shops){
          this.shopMenu.append(`<li><a class="dropdown-item" href="#" value="${shop.id}">${shop.city}</a></li>`);
      }

      for (let category of categories){
        this.categoryMenu.append(`<li><a class="dropdown-item" href="#" value="${category.title}">${category.title}</a></li>`);
      }
  }

  bindShop(handler){
    $('#dropdown-menu-shops').find('a').click( (event) => { 
      let shop = event.target.attributes.value.value;      
      
      this.#excecuteHandler(
				handler, [shop],
				'#dropdown-menu-shops',
				{action: 'clickDropdown', category: shop},
				'#dropdown-menu-shops', event
				);
    });

    $('#custom-cards').find('a').click( (event) => { 
      let shop = event.target.attributes.value.value;      

      this.#excecuteHandler(
				handler, [shop],
				'#dropdown-menu-shops',
				{action: 'clickDropdown', category: shop},
				'#dropdown-menu-shops', event
				);
    });
  }

  bindCategorie(handler){
    $('.dropdown').find('a').click( (event) => { 
      let link = event.target.attributes.value.value;      
      
      this.#excecuteHandler(
				handler, [link],
				'.dropdown',
				{action: 'clickDropdown', category: link},
				'.dropdown', event
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
        </ul>
      `);
      // console.log(category.products);
      // $('.product-table').after(`
      // <ul class="list-group list-group-horizontal">
      //   <li class="list-group-item">e</li>
      //   <li class="list-group-item">e</li>
      //   <li class="list-group-item">e</li>
      //   <li class="list-group-item">e</li>
      //   <li class="list-group-item">e</li>
      // </ul>
      // `);

        for (let [key, value] of category.products) {
          if (shop.products.has(value.serial)){
            $('.product-table').after(`
            <ul class="list-group list-group-horizontal ">
              <li class="list-group-item flex-fill">${value.serial}</li>
              <li class="list-group-item flex-fill">${value.brand}</li>
              <li class="list-group-item flex-fill">${value.model}</li>
              <li class="list-group-item flex-fill">${value.price}</li>
              <li class="list-group-item flex-fill">${value.description}</li>
            </ul>
            `);
          }
          
        }     

        $('.product-table').removeClass('product-table');
        // i++;
    }
  }

  bindProducts(handler){

  }
}

export default SuperTiendaView;