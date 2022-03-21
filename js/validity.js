function valid(handler){
    var form = document.forms.addProductForm;
        $(form.serial).mask('000-000');
        $(form.inches).mask('00');
        $('#sendButton').click(function (event) { 
            event.preventDefault();
            let type = $('#productType')[0].value;
            let isValid = true;

            if  (!validProduct(form)){
                isValid = false;
                event.preventDefault();
                event.stopPropagation();
            }
            
            if (type=='Smartphone'){
                if (!validitySmartPhone(form)){
                    isValid = false;
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
            
            if (type=='Tv'){
                if (!validityTv(form)){
                    isValid = false;
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
            
            if (type=='Laptop'){
                if (!validityLaptop(form)){
                    isValid = false;
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
            if (isValid){
                handler(type, form);
            }
            
        });

        form.addEventListener('keyup', function (event) {
        let type = $('#productType')[0].value;
            validProduct(form);       
        }, false);

    function validProduct(form){
        let valid = true;
        if(!(/(\d{3}-\d{3})$/.test(form.serial.value))){
            // valid = false;
            validity(form.serial, false);
            valid = false;
          } else {
            validity(form.serial, true);
         }
        if(!(form.model.value.length <= 15) ||  !(form.model.value.length > 0)){
            valid = false;
            validity(form.model, false);
        } else {
            validity(form.model, true); 
          }

        if(!(form.brand.value.length <= 15) ||  !(form.brand.value.length > 0)){
            valid = false;
            validity(form.brand, false);
        } else {
            validity(form.brand, true);
          }

        if(!(/[\d,?]/.test(form.price.value))){
            valid = false;
            validity(form.price, false);
        } else {
            validity(form.price, true);
          }
        if(!(form.description.value.length <= 50) ||  !(form.description.value.length > 0)){
            valid = false;
            validity(form.description, false);
        } else {
            validity(form.description, true);
          }
        if (!$('#categories').find('input').prop('checked')){
            valid = false;
            $('#categories').find('.invalid-feedback').show();
        } else {
            $('#categories').find('.invalid-feedback').hide();
          }
          return valid;
    }

    function validitySmartPhone(form){
        let valid = true;
        if(!(/([2-5]G)/.test(form.band.value))){
            validity(form.band, false);
            valid = false;
          } else {
            validity(form.band, true);
         }
         if(!(form.storage.value.length <= 15) ||  !(form.storage.value.length > 0)){
            // valid = false;
            validity(form.storage, false);
            valid = false;
          } else {
            validity(form.storage, true);
         }
         if(!(form.color.value.length <= 15) ||  !(form.color.value.length > 0)){
            // valid = false;
            validity(form.color, false);
            valid = false;
          } else {
            validity(form.color, true);
         }
         return valid;
    }

    function validityLaptop(form){
        let valid = true;
        if(!(form.processor.value.length <= 15) ||  !(form.processor.value.length > 0)){
            validity(form.processor, false);
            valid = false;
          } else {
            validity(form.processor, true);
         }
         if(!(form.storage.value.length <= 5) ||  !(form.storage.value.length > 0)){
            // valid = false;
            validity(form.storage, false);
            valid = false;
          } else {
            validity(form.storage, true);
         }
         if(!(form.memory.value.length <= 5) ||  !(form.memory.value.length > 0)){
            // valid = false;
            validity(form.memory, false);
            valid = false;
          } else {
            validity(form.memory, true);
         }
         return valid;
    }

    function validityTv(form){
        let valid = true;
        if(!(/\d{2}/.test(form.inches.value))){
            validity(form.inches, false);
            valid = false;
          } else {
            validity(form.inches, true);
         }
         return valid;
    }
    
    
}

function validCategory(handler){
    var form = document.forms.addCategoryForm;
    $('#sendButton').click(function (event) { 
        event.preventDefault();
        let isValid = true;
        if  (!validCategory(form)){
            isValid = false;
            event.preventDefault();
            event.stopPropagation();
        }

        if (isValid){
            handler(form);
        }
    });

    form.addEventListener('keyup', function (event) {
        validCategory(form);       
    }, false);


    function validCategory(form){
        let valid = true;
        if(!(form.title.value.length <= 15) ||  !(form.title.value.length > 0)){
            validity(form.title, false);
            valid = false;
          } else {
            validity(form.title, true);
         }
         if(!(form.description.value.length <= 50) ||  !(form.description.value.length > 0)){
            valid = false;
            validity(form.description, false);
        } else {
            validity(form.description, true);
          }

          if(!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(form.image.value))){
            valid = false;
            validity(form.image, false);
        } else {
            validity(form.image, true);
          }
          return valid;
    }

    
}

function validDeleteProduct(handler){
    var form = document.forms.deleteProductForm;

    $('#sendButton').click(function (event) { 
        event.preventDefault()
        let isValid = true;
        if(!(/(\d{3}-\d{3})$/.test(form.serial.value))){
            validity(form.serial, false);
            isValid = false;
          } else {
            validity(form.serial, true);
        }

        if (isValid){
            handler(form.serial.value);
        }
    });
}

function validDeleteCategory(handler){
    var form = document.forms.deleteCategoryForm;

    $('#sendButton').click(function (event) { 
        event.preventDefault()
        let isValid = true;
        if(!(form.category.value.length <= 15) ||  !(form.category.value.length > 0)){
            valid = false;
            validity(form.category, false);
        } else {
            validity(form.category, true); 
          }

        if (isValid){
            handler(form.category.value);
        }
    });
}

function validShop(handler){
    var form = document.forms.addShopForm;

    $('#sendButton').click(function (event) { 
        event.preventDefault()
        let isValid = true;

        if(!(/(\d)$/.test(form.id.value))){
            isValid = false;
            validity(form.id, false);
        } else {
            validity(form.id, true); 
          }

        if(!(form.address.value.length <= 15) ||  !(form.address.value.length > 0)){
            isValid = false;
            validity(form.address, false);
        } else {
            validity(form.address, true); 
          } 

        if(!(form.city.value.length <= 15) ||  !(form.city.value.length > 0)){
            isValid = false;
            validity(form.city, false);
        } else {
            validity(form.city, true); 
        }

        if(!(form.country.value.length <= 15) ||  !(form.country.value.length > 0)){
            isValid = false;
            validity(form.country, false);
        } else {
            validity(form.country, true); 
        } 

        if(!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(form.image.value))){
            isValid = false;
            validity(form.image, false);
        } else {
            validity(form.image, true);
        }

        if (isValid){
            handler(form);
        }
    });

    
}

function validDeleteShop(handler){
    var form = document.forms.deleteShopForm;

    $('#sendButton').click(function (event) { 
        event.preventDefault()
        let isValid = true;
        if(!(/(\d)$/.test(form.id.value))){
            valid = false;
            validity(form.id, false);
        } else {
            validity(form.id, true); 
          }

        if (isValid){
            handler(form.id.value);
        }
    });
}


function validity(input, valid){
    if (valid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        input.parentElement.classList.remove('was-validated');
    }
}

export {valid, validCategory, validDeleteProduct, validDeleteCategory, validDeleteShop, validShop} ;

