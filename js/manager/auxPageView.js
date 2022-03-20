class AuxPageView{
    // #excecuteHandler(handler, handlerArguments, scrollElement, data, url, event){
	// 	handler(...handlerArguments);
	// 	$(scrollElement).get(0).scrollIntoView();
    // // console.log("estado: "+history.state);
    // // console.log("data: "+data);
    // history.pushState(data, null, url);
	// 	event.preventDefault();
	// }

    #product;
    #productType;

  #excecuteHandlerOffHistory(handler, handlerArguments, event){
		handler(...handlerArguments);
		event.preventDefault();
	}

    constructor(){
        this.main = $('main');
        this.main.empty();
    }

    displaySmartphone(product){
        this.main.empty();
        this.main.append(`<div class="container m-3" id="shop-info">
        <h2 class="pb-2 border-bottom">Información sobre el Smartphone</h2>
        <div class="e" style="background-color: ; float: left; ">
          <img src="https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_960_720.jpg" alt="" width='300px' class="shop-img m-3 rounded">
    
        </div>
        <h3 class="m-3">${product.model}</h3>
        <ul class="list-group">
          <li class="list-group-item active" aria-current="true">
          Características especiales

          </li><li class="list-group-item">Banda : ${product.band}
          </li><li class="list-group-item">Almacenamiento: ${product.storage}
          </li><li class="list-group-item">Color: ${product.color}
        </li></ul>
        </div><div class="container">
        <h3 class="m-3 border-bottom">Características</h3>
          <div class="container m-3" id="products-shop">
    
          <div class="container"></div>
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item active">Serial</li>
              <li class="list-group-item active">Marca</li>
              <li class="list-group-item active">Modelo</li>
              <li class="list-group-item active">Precio</li>
              <li class="list-group-item active">Descripción</li>
              
            </ul>
              <ul class="list-group list-group-horizontal ">
                <li class="list-group-item flex-fill">${product.serial}</li>
                <li class="list-group-item flex-fill">${product.brand}</li>
                <li class="list-group-item flex-fill">${product.model}</li>
                <li class="list-group-item flex-fill">${product.price}</li>
                <li class="list-group-item flex-fill">${product.description}</li>
            </ul>
          </div>
        </div>`)


    }

    displayLaptop(product){
        this.main.empty();
        this.main.append(`<div class="container m-3" id="shop-info">
        <h2 class="pb-2 border-bottom">Información sobre el Portatil</h2>
        <div class="e" style="background-color: ; float: left; ">
          <img src="https://cdn.pixabay.com/photo/2015/09/04/23/28/wordpress-923188_960_720.jpg" alt="" width='300px' class="shop-img m-3 rounded">
    
        </div>
        <h3 class="m-3">${product.model}</h3>
        <ul class="list-group">
          <li class="list-group-item active" aria-current="true">
          Características especiales

          </li><li class="list-group-item">Procesador : ${product.processor}
          </li><li class="list-group-item">Almacenamiento: ${product.storage}
          </li><li class="list-group-item">Memoria RAM: ${product.memory}
        </li></ul>
        </div><div class="container">
        <h3 class="m-3 border-bottom">Características</h3>
          <div class="container m-3" id="products-shop">
    
          <div class="container"></div>
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item active">Serial</li>
              <li class="list-group-item active">Marca</li>
              <li class="list-group-item active">Modelo</li>
              <li class="list-group-item active">Precio</li>
              <li class="list-group-item active">Descripción</li>
              
            </ul>
              <ul class="list-group list-group-horizontal ">
                <li class="list-group-item flex-fill">${product.serial}</li>
                <li class="list-group-item flex-fill">${product.brand}</li>
                <li class="list-group-item flex-fill">${product.model}</li>
                <li class="list-group-item flex-fill">${product.price}</li>
                <li class="list-group-item flex-fill">${product.description}</li>
            </ul>
          </div>
        </div>`)


    }

    displayTv(product){
        this.main.empty();
        let smartTv;
        if (product.smart){
            smartTv = 'Sí';
        } else{
            smartTv = 'No';
        }
        this.main.append(`<div class="container m-3" id="shop-info">
        <h2 class="pb-2 border-bottom">Información sobre el Televisor</h2>
        <div class="e" style="background-color: ; float: left; ">
          <img src="https://cdn.pixabay.com/photo/2022/02/21/06/47/applications-7025904_960_720.jpg" alt="" width='300px' class="shop-img m-3 rounded">
    
        </div>
        <h3 class="m-3">${product.model}</h3>
        <ul class="list-group">
          <li class="list-group-item active" aria-current="true">
          Características especiales

          </li><li class="list-group-item">Pulgadas : ${product.inches}
          </li><li class="list-group-item">Smart Tv: ${smartTv}
        </li></ul>
        </div><div class="container">
        <h3 class="m-3 border-bottom">Características</h3>
          <div class="container m-3" id="products-shop">
    
          <div class="container"></div>
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item active">Serial</li>
              <li class="list-group-item active">Marca</li>
              <li class="list-group-item active">Modelo</li>
              <li class="list-group-item active">Precio</li>
              <li class="list-group-item active">Descripción</li>
              
            </ul>
              <ul class="list-group list-group-horizontal ">
                <li class="list-group-item flex-fill">${product.serial}</li>
                <li class="list-group-item flex-fill">${product.brand}</li>
                <li class="list-group-item flex-fill">${product.model}</li>
                <li class="list-group-item flex-fill">${product.price}</li>
                <li class="list-group-item flex-fill">${product.description}</li>
            </ul>
          </div>
        </div>`)


    }

    displayProduct(product){
        this.main.empty();
        this.main.append(`<div class="container m-3" id="shop-info">
        <h2 class="pb-2 border-bottom">Información sobre el Producto</h2>
        <div class="e" style="background-color: ; float: left; ">
          <img src="https://techbooky.com/wp-content/uploads/2020/10/tech-gadgets.jpg" alt="" width='300px' class="shop-img m-3 rounded">
    
        </div>
        <div class='product-model'>
            <h3 class="m-3">${product.model}</h3>
        </div>
        
        
        </div>
        
        <div class="container" style='float: left;'>
        
        
        <h3 class="m-3 border-bottom">Características</h3>
          <div class="container m-3" id="products-shop">
    
          <div class="container"></div>
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item active">Serial</li>
              <li class="list-group-item active">Marca</li>
              <li class="list-group-item active">Modelo</li>
              <li class="list-group-item active">Precio</li>
              <li class="list-group-item active">Descripción</li>
              
            </ul>
              <ul class="list-group list-group-horizontal ">
                <li class="list-group-item flex-fill">${product.serial}</li>
                <li class="list-group-item flex-fill">${product.brand}</li>
                <li class="list-group-item flex-fill">${product.model}</li>
                <li class="list-group-item flex-fill">${product.price}</li>
                <li class="list-group-item flex-fill">${product.description}</li>
            </ul>
          </div>
        </div>`);

        $('.product-model').append(`
        
        `)


    }
    
}

export default AuxPageView;