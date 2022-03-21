import {SuperTienda} from './manager.js';
import { testManager } from './managerTest.js';
import AuxPageApp from './auxPageApp.js';
import {valid, validCategory, validDeleteProduct, validDeleteCategory, validDeleteShop, validShop} from '../validity.js';

class SuperTiendaView {
 #auxPageApp = AuxPageApp.getInstance();

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
    this.adminMenu = $('#dropdown-menu-admin');
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

  loadAdminMenu(){
    this.adminMenu.empty();
    this.adminMenu.append(`<li><a class="dropdown-item pointer" value="addProductForm">Añadir Producto</a></li>`);
    this.adminMenu.append(`<li><a class="dropdown-item pointer" value="addCategoryForm">Añadir Categoría</a></li>`);
    this.adminMenu.append(`<li><a class="dropdown-item pointer" value="deleteProductForm">Borrar Producto</a></li>`);
    this.adminMenu.append(`<li><a class="dropdown-item pointer" value="deleteCategoryForm">Borrar Categoría</a></li>`);
    this.adminMenu.append(`<li><a class="dropdown-item pointer" value="addShopForm">Añadir Tienda</a></li>`);
    this.adminMenu.append(`<li><a class="dropdown-item pointer" value="deleteShopForm">Borrar Tienda</a></li>`);

  }

  addProductForm(categories){
    this.main.empty();
    this.main.append(`
      <div class='container px-4 py-5 mt-3 myForm'>
      <h2 class="pb-2 border-bottom">Formulario de registro de producto</h2>
      <br>
      <form class="needs-validation" novalidate name='addProductForm' method="get" id="addProductForm">
        <select class="form-select" name="productType" id="productType">
          <option value="Product">Estándar</option>
          <option value="Smartphone">Smartphone</option>
          <option value="Tv">Televisión</option>
          <option value="Laptop">Portatil</option>
        </select>
        
        <br>
        <div class="form-floating mb-3">
          <input required type="text" class="form-control" id="serial" placeholder="">
          <label for="floatingInput">Serial</label>
          <div class="invalid-feedback">
            La sintaxis del número de serie del producto es "000-000".
          </div>
        </div>

        <div class="form-floating mb-3">
          <input required type="text" class="form-control" id="model" placeholder="">
          <label for="floatingInput">Modelo</label>
          <div class="invalid-feedback">
            El campo Modelo debe tener entre 1 y 15 caracteres.
          </div>
        </div>

        <div class="form-floating mb-3">
          <input required type="text" class="form-control" id="brand" placeholder="">
          <label for="floatingInput">Marca</label>
          <div class="invalid-feedback">
            El campo Marca debe tener entre 1 y 15 caracteres.
          </div>
        </div>

        <div class="form-floating mb-3">
          <input required type="text" class="form-control" id="price" placeholder="">
          <label for="floatingInput">Precio</label>
          <div class="invalid-feedback">
            Debe proporcionar un número.
          </div>
        </div>

        
        <label for="description">Descripción</label><br>
        <textarea class='form-control' name="description" id="description" cols="50" rows="3"></textarea>
        <div class="invalid-feedback">
            El campo Descripción debe tener entre 1 y 50 caracteres.
        </div>
        <br><br>
        <div id='extra'></div>
        <br><br>
        <div id='categories'>Añadir a Categoría
        
        <div class="invalid-feedback">
            Debe marcar al menos una categoría.
          </div>
        </div>
        
        
        <br><br>
        <button class="btn btn-primary" id='sendButton'>Enviar</button>
      </form>
       
      </div>
      `);

      for (let category of categories){
        $('#categories').append(`
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name='categories' value="${category.title}" id="${category.title}">
            <label class="form-check-label" for="defaultCheck1">
              ${category.title}
            </label>
            
          </div>
        `);
      }

      $('.form-select').click(function (e) { 
        e.preventDefault();
        $('#extra').empty();
        // $('#description').after(`<div id='extra'></div>`);
        let type = $('#productType')[0].value;
        console.log(type);

        switch (type) {
          case 'Product':
            $('#extra').empty();
            break;
          case 'Smartphone':
            // $('#extra').empty();
            $('#extra').html(`
                <div class="form-floating mb-3">
                <input required type="text" class="form-control" id="band" placeholder="">
                <label for="floatingInput">Banda</label>
                <div class="invalid-feedback">
                  La sintaxis del campo Banda debe ser '2G/3G/4G/5G'.
                </div>
              </div>
      
              <div class="form-floating mb-3">
                <input required type="text" class="form-control" id="storage" placeholder="">
                <label for="floatingInput">Almacenamiento</label>
                <div class="invalid-feedback">
                  El campo Almacenamiento debe tener entre 1 y 15 caracteres.
                </div>
              </div>
      
              <div class="form-floating mb-3">
                <input required type="text" class="form-control" id="color" placeholder="">
                <label for="floatingInput">Color</label>
                <div class="invalid-feedback">
                  El campo Color debe tener entre 1 y 15 caracteres.
                </div>
              </div>
            `);
            break;
            case 'Tv':
              // $('#extra').empty();
              $('#extra').html(`
                  <div class="form-floating mb-3">
                  <input required type="text" class="form-control" id="inches" placeholder="">
                  <label for="floatingInput">Pulgadas</label>
                  <div class="invalid-feedback">
                      El campo Pulgadas debe ser un número de dos dígitos
                  </div>
                </div>
        
                <label class="form-check-label" for="yes">Smart Tv</label>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="smart" value="true">
                  <label class="form-check-label" for="yes">
                    Sí
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="smart" value="false" checked>
                  <label class="form-check-label" for="no">
                    No
                  </label>
                </div>
        
              `);
              break;
              case 'Laptop':
                // $('#extra').empty();
                $('#extra').html(`
                <div class="form-floating mb-3">
                <input required type="text" class="form-control" id="processor" placeholder="">
                <label for="floatingInput">Procesador</label>
                <div class="invalid-feedback">
                  El campo Procesador debe tener entre 1 y 15 caracteres.
                </div>
              </div>
      
              <div class="form-floating mb-3">
                <input required type="text" class="form-control" id="storage" placeholder="">
                <label for="floatingInput">Almacenamiento</label>
                <div class="invalid-feedback">
                    El campo Almacenamiento debe tener entre 1 y 5 caracteres.
                </div>
              </div>
      
              <div class="form-floating mb-3">
                <input required type="text" class="form-control" id="memory" placeholder="">
                <label for="floatingInput">Memoria RAM</label>
                <div class="invalid-feedback">
                  El campo Memoria RAM debe tener entre 1 y 5 caracteres.
                </div>
              </div>
                `);
                break;
          default:
            break;
        }

      });

      
      


  }

  bindNewProductForm(handler){
    valid(handler);
  }

  bindAdmin(handler){
    $('#dropdown-menu-admin').find('a').click( (event) => { 
      let link = event.target.attributes.value.value;      
      this.#excecuteHandler(
				handler, [link],
				'body',
				{page: 'admin', type: link},
				'', event
				);
    });
  }

  showNewProductModal(done, product, error){
    if (done){
        let modal = $(`<div class="modal fade" id="newProductModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Producto añadido con éxito</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              El producto ${product.serial} de la marca ${product.brand} ha sido añadido con éxito.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
              
            </div>
          </div>
        </div>
      </div>`);

      $('body').append(modal);
      let newProductModal = $('#newProductModal');
      newProductModal.modal('show');
      newProductModal.find('button').click(() => {
        newProductModal.on('hidden.bs.modal', function (event) {
          document.addProductForm.reset();
        this.remove();
        });
        newProductModal.modal('hide');
        })
        
    } else {
      let modal = $(`<div class="modal fade" id="newProductModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger" id="exampleModalLabel">El Producto ya existe.</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-danger">
              El producto ${product.serial} ya existe.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
              
            </div>
          </div>
        </div>
      </div>`);

      $('body').append(modal);
      let newProductModal = $('#newProductModal');
      newProductModal.modal('show');
      newProductModal.find('button').click(() => {
        newProductModal.on('hidden.bs.modal', function (event) {
          document.addProductForm.reset();
        this.remove();
        });
        newProductModal.modal('hide');
        })
      // $(document.addProductForm).prepend(`<div class="error text-danger p-
      //   3"><i class="fas fa-exclamation-
      //   triangle"></i> El Producto <strong>${product.model}</strong> ya existe.
      //   </div>`);
    }
    $('#addProductForm').find('input').removeClass('is-valid');
    $('#addProductForm').find('textarea').removeClass('is-valid');
  }

  addCategoryForm(){
    this.main.empty();
    this.main.append(`
      <div class='container px-4 py-5 mt-3 myForm'>
      <h2 class="pb-2 border-bottom">Formulario de registro de categoría</h2>
      <br>
      <form class="needs-validation" novalidate name='addCategoryForm' method="get" id="addCategoryForm">
        
        
        
        <div class="form-floating mb-3">
          <input required type="text" class="form-control" id="title" placeholder="">
          <label for="floatingInput">Título</label>
          <div class="invalid-feedback">
            El campo Título debe tener entre 1 y 15 caracteres.
          </div>
        </div>

        <label for="description">Descripción</label><br>
        <textarea class='form-control' name="description" id="description" cols="50" rows="3"></textarea>
        <div class="invalid-feedback">
            El campo Descripción debe tener entre 1 y 50 caracteres.
        </div>
        <br><br>

        <div class="form-floating mb-3">
          <input required type="url" class="form-control" id="image" placeholder="http://www.example.es">
          <label for="floatingInput">Imagen</label>
          <div class="invalid-feedback">
            El campo Imagen debe ser una URL.
          </div>
        </div>       
        
        <br><br>
        <button class="btn btn-primary" id='sendButton'>Enviar</button>
      </form>
       
      </div>
    `);
  }

  bindNewCategoryForm(handler){
    validCategory(handler);
  }

  addShopForm(){
    this.main.empty();
    this.main.append(`
      <div class='container px-4 py-5 mt-3 myForm'>
      <h2 class="pb-2 border-bottom">Formulario de registro de categoría</h2>
      <br>
      <form class="needs-validation" novalidate name='addShopForm' method="get" id="addShopForm">
        
        
        
        <div class="form-floating mb-3">
          <input required type="text" class="form-control" id="id" placeholder="">
          <label for="floatingInput">Id</label>
          <div class="invalid-feedback">
            El campo Id debe ser un número.
          </div>
        </div>

        <div class="form-floating mb-3">
          <input required type="text" class="form-control" id="address" placeholder="">
          <label for="floatingInput">Dirección</label>
          <div class="invalid-feedback">
            El campo Dirección debe tener entre 1 y 30 caracteres.
          </div>
        </div>

        <div class="form-floating mb-3">
          <input required type="text" class="form-control" id="country" placeholder="">
          <label for="floatingInput">País</label>
          <div class="invalid-feedback">
            El campo Dirección debe tener entre 1 y 15 caracteres.
          </div>
        </div>

        <div class="form-floating mb-3">
          <input required type="text" class="form-control" id="city" placeholder="">
          <label for="floatingInput">Ciudad</label>
          <div class="invalid-feedback">
            El campo Dirección debe tener entre 1 y 15 caracteres.
          </div>
        </div>
        

        <div class="form-floating mb-3">
          <input required type="url" class="form-control" id="image" placeholder="http://www.example.es">
          <label for="floatingInput">Imagen</label>
          <div class="invalid-feedback">
            El campo Imagen debe ser una URL.
          </div>
        </div>       
        
        <br><br>
        <button class="btn btn-primary" id='sendButton'>Enviar</button>
      </form>
       
      </div>
    `);
  }

  bindNewShopForm(handler){
    validShop(handler);
  }

  showNewShopModal(done, shop, error){
    if (done){
        let modal = $(`<div class="modal fade" id="newShopModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Tienda añadida con éxito</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              La tienda ${shop} ha sido añadida con éxito.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
              
            </div>
          </div>
        </div>
      </div>`);

      $('body').append(modal);
      let newShopModal = $('#newShopModal');
      newShopModal.modal('show');
      newShopModal.find('button').click(() => {
        newShopModal.on('hidden.bs.modal', function (event) {
          document.addShopForm.reset();
        this.remove();
        });
        newShopModal.modal('hide');
        })
        
    } else {
      let modal = $(`<div class="modal fade" id="newCategoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger" id="exampleModalLabel">La tienda ya existe.</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-danger">
              La tienda ${shop} ya existe.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
              
            </div>
          </div>
        </div>
      </div>`);

      $('body').append(modal);
      let newShopModal = $('#newShopModal');
      newShopModal.modal('show');
      newShopModal.find('button').click(() => {
        newShopModal.on('hidden.bs.modal', function (event) {
          document.addShopForm.reset();
        this.remove();
        });
        newShopModal.modal('hide');
        })
    }
    $('#addShopForm').find('input').removeClass('is-valid');
    $('#addShopForm').find('textarea').removeClass('is-valid');
  }

  deleteProductForm(products){
    this.main.empty();
    this.main.append(`
      <div class='container px-4 py-5 mt-3 myForm'>
      <h2 class="pb-2 border-bottom">Formulario eliminación de producto</h2>
      <br>
      <form class="needs-validation" novalidate name='deleteProductForm' method="get" id="deleteProductForm">
        
        
        
      <label for="exampleDataList" class="form-label">Escribe el Nº de serie, Marca o modelo para buscar el producto y se autocompletará con el Nº de serie.</label>
      <input class="form-control" list="deleteProductDataList" id="serial" placeholder="">
      <datalist id="deleteProductDataList">
        
      </datalist>

        <br><br>
        <button class="btn btn-danger" id='sendButton'>Eliminar</button>
      </form>
       
      </div>
    `);
    for (let product of products){
      $('#deleteProductDataList').append(`
        <option value="${product.serial}"> ${product.serial} ${product.brand} ${product.model}
      `);
    }
    
  }

  bindDeleteProductForm(handler){
    validDeleteProduct(handler);
  }

  showDeleteProductModal(done, serial, error){
    if (done){
        let modal = $(`<div class="modal fade" id="deleteProductModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Producto añadido con éxito</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              El producto ${serial} ha sido eliminado con éxito.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
              
            </div>
          </div>
        </div>
      </div>`);

      $('body').append(modal);
      let deleteProductModal = $('#deleteProductModal');
      deleteProductModal.modal('show');
      deleteProductModal.find('button').click(() => {
        deleteProductModal.on('hidden.bs.modal', function (event) {
          document.deleteProductForm.reset();
        this.remove();
        });
        deleteProductModal.modal('hide');
        })
        
    } else {
      let modal = $(`<div class="modal fade" id="deleteProductModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger" id="exampleModalLabel">El Producto no existe.</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-danger">
              El producto ${serial} no existe.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
              
            </div>
          </div>
        </div>
      </div>`);

      $('body').append(modal);
      let deleteProductModal = $('#deleteProductModal');
      deleteProductModal.modal('show');
      deleteProductModal.find('button').click(() => {
        deleteProductModal.on('hidden.bs.modal', function (event) {
          document.deleteProductForm.reset();
        this.remove();
        });
        deleteProductModal.modal('hide');
        })
    }
  }

  deleteCategoryForm(categories){
    this.main.empty();
    this.main.append(`
      <div class='container px-4 py-5 mt-3 myForm'>
      <h2 class="pb-2 border-bottom">Formulario eliminación de categoría</h2>
      <br>
      <form class="needs-validation" novalidate name='deleteCategoryForm' method="get" id="deleteCategoryForm">
      <label for="exampleDataList" class="form-label">Escribe el título de la categoría que desea eliminar.</label>
      <input class="form-control" list="deleteCategorytDataList" id="category" placeholder="">
      <datalist id="deleteCategorytDataList">
        
      </datalist>

        <br><br>
        <button class="btn btn-danger" id='sendButton'>Eliminar</button>
      </form>
       
      </div>
    `);
    for (let category of categories){
      $('#deleteCategorytDataList').append(`
        <option value="${category.title}"> ${category.title}
      `);
    }
    
  }

  bindDeleteCategoryForm(handler){
    validDeleteCategory(handler);
  }

  deleteShopForm(shops){
    this.main.empty();
    this.main.append(`
      <div class='container px-4 py-5 mt-3 myForm'>
      <h2 class="pb-2 border-bottom">Formulario eliminación de tiendas</h2>
      <br>
      <form class="needs-validation" novalidate name='deleteShopForm' method="get" id="deleteShopForm">
      <label for="exampleDataList" class="form-label">Escribe la ciudad, pais o Id de la tienda que desea eliminar y se autocompletará con el Id correspondiente.</label>
      <input class="form-control" list="deleteShopDataList" id="id" placeholder="">
      <datalist id="deleteShopDataList">
        
      </datalist>

        <br><br>
        <button class="btn btn-danger" id='sendButton'>Eliminar</button>
      </form>
       
      </div>
    `);
    for (let shop of shops){
      $('#deleteShopDataList').append(`
        <option value="${shop.id}"> ${shop.city} ${shop.country}
      `);
    }
  }

  bindDeleteShopForm(handler){
    validDeleteShop(handler);
  }

  showDeleteShopModal(done, shop, error){
    if (done){
        let modal = $(`<div class="modal fade" id="deleteShopModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Tienda eliminada con éxito</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              La tienda ${shop} ha sido eliminada con éxito.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
              
            </div>
          </div>
        </div>
      </div>`);

      $('body').append(modal);
      let deleteShopModal = $('#deleteShopModal');
      deleteShopModal.modal('show');
      deleteShopModal.find('button').click(() => {
        deleteShopModal.on('hidden.bs.modal', function (event) {
          document.deleteShopForm.reset();
        this.remove();
        });
        deleteShopModal.modal('hide');
        })
        
    } else {
      let modal = $(`<div class="modal fade" id="deleteShopModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger" id="exampleModalLabel">La tienda no existe.</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-danger">
            La tienda ${shop} no existe.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
              
            </div>
          </div>
        </div>
      </div>`);

      $('body').append(modal);
      let deleteShopModal = $('#deleteCategoryModal');
      deleteShopModal.modal('show');
      deleteShopModal.find('button').click(() => {
        deleteShopModal.on('hidden.bs.modal', function (event) {
          document.deleteShopForm.reset();
        this.remove();
        });
        deleteShopModal.modal('hide');
        })
    }
  }

  showDeleteCategoryModal(done, category, error){
    if (done){
        let modal = $(`<div class="modal fade" id="deleteCategoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Categoría eliminada con éxito</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              La categoría ${category} ha sido eliminada con éxito.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
              
            </div>
          </div>
        </div>
      </div>`);

      $('body').append(modal);
      let deleteCategoryModal = $('#deleteCategoryModal');
      deleteCategoryModal.modal('show');
      deleteCategoryModal.find('button').click(() => {
        deleteCategoryModal.on('hidden.bs.modal', function (event) {
          document.deleteCategoryForm.reset();
        this.remove();
        });
        deleteCategoryModal.modal('hide');
        })
        
    } else {
      let modal = $(`<div class="modal fade" id="deleteProductModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger" id="exampleModalLabel">La categoría no existe.</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-danger">
            La categoría ${category} no existe.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
              
            </div>
          </div>
        </div>
      </div>`);

      $('body').append(modal);
      let deleteCategoryModal = $('#deleteCategoryModal');
      deleteCategoryModal.modal('show');
      deleteCategoryModal.find('button').click(() => {
        deleteCategoryModal.on('hidden.bs.modal', function (event) {
          document.deleteCategoryForm.reset();
        this.remove();
        });
        deleteCategoryModal.modal('hide');
        })
    }
  }

  showNewProductModal(done, product, error){
    if (done){
        let modal = $(`<div class="modal fade" id="newProductModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Producto añadido con éxito</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              El producto ${product.serial} de la marca ${product.brand} ha sido añadido con éxito.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
              
            </div>
          </div>
        </div>
      </div>`);

      $('body').append(modal);
      let newProductModal = $('#newProductModal');
      newProductModal.modal('show');
      newProductModal.find('button').click(() => {
        newProductModal.on('hidden.bs.modal', function (event) {
          document.addProductForm.reset();
        this.remove();
        });
        newProductModal.modal('hide');
        })
        
    } else {
      let modal = $(`<div class="modal fade" id="newProductModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger" id="exampleModalLabel">El Producto ya existe.</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-danger">
              El producto ${product.serial} ya existe.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
              
            </div>
          </div>
        </div>
      </div>`);

      $('body').append(modal);
      let newProductModal = $('#newProductModal');
      newProductModal.modal('show');
      newProductModal.find('button').click(() => {
        newProductModal.on('hidden.bs.modal', function (event) {
          document.addProductForm.reset();
        this.remove();
        });
        newProductModal.modal('hide');
        })
      // $(document.addProductForm).prepend(`<div class="error text-danger p-
      //   3"><i class="fas fa-exclamation-
      //   triangle"></i> El Producto <strong>${product.model}</strong> ya existe.
      //   </div>`);
    }
    $('#addProductForm').find('input').removeClass('is-valid');
    $('#addProductForm').find('textarea').removeClass('is-valid');
  }

  showNewCategoryModal(done, category, error){
    if (done){
        let modal = $(`<div class="modal fade" id="newCategoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Categoría añadida con éxito</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              La categoría ${category.title} ha sido añadida con éxito.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
              
            </div>
          </div>
        </div>
      </div>`);

      $('body').append(modal);
      let newCategoryModal = $('#newCategoryModal');
      newCategoryModal.modal('show');
      newCategoryModal.find('button').click(() => {
        newCategoryModal.on('hidden.bs.modal', function (event) {
          document.addCategoryForm.reset();
        this.remove();
        });
        newCategoryModal.modal('hide');
        })
        
    } else {
      let modal = $(`<div class="modal fade" id="newCategoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger" id="exampleModalLabel">El Producto ya existe.</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-danger">
              La categoría ${category.title} ya existe.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
              
            </div>
          </div>
        </div>
      </div>`);

      $('body').append(modal);
      let newCategoryModal = $('#newCategoryModal');
      newCategoryModal.modal('show');
      newCategoryModal.find('button').click(() => {
        newCategoryModal.on('hidden.bs.modal', function (event) {
          document.addCategoryForm.reset();
        this.remove();
        });
        newCategoryModal.modal('hide');
        })
    }
    $('#addCategoryForm').find('input').removeClass('is-valid');
    $('#addCategoryForm').find('textarea').removeClass('is-valid');
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

    let i = 0;
    for (let category of categories){
      if (!(category === undefined)){
        
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
        
      }     }
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