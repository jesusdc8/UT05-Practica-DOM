import {BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	InvalidValueException,
	AbstractClassException
  } from '../exceptions.js';

class Product{
    // Definimos campos privados
    #serial;
    #brand;
	#model;
	#price;
	#description;

    constructor (serial, brand, model, price, description = ''){
        this.#serial = serial;
		this.#brand = brand;
		this.#model = model;
		this.#price = price;
		this.#description = description;
    }

    //Propiedades de acceso a los atributos privados
	get serial(){
		return this.#serial;
	}
	set serial(value){
		if (!value) throw new EmptyValueException("serial");
		this.#serial = value;
	}

	get brand(){
		return this.#brand;
	}
	set brand(value){
		if (!value) throw new EmptyValueException("brand");
		this.#brand = value;
	}

	get model(){
		return this.#model;
	}
	set model(value){
		if (!value) throw new EmptyValueException("model");
		this.#model = value;
	}

	get price(){
		return this.#price;
	}
	set price(value){
		value = Number.parseFloat(value);
		if (Number.isNaN(value) && value > 0) throw new InvalidValueException("price", value);
		this.#price = value;
	}

    get description(){
        return this.#description;
    }
    set description(value){
        if (!value) throw new EmptyValueException("description");
		this.#description = description;
    }

	toString(){
		return "serial:" + this.serial + ",brand: " + this.brand + ",model: " + this.model + ",price: " + this.price + ",description: " + this.description;
	}
}

class Smartphone extends Product {
	//Atributos privados
	#band;
	#storage;
	#color;
	constructor (serial, brand, model, price, description, band = "2G", storage = "0GB", color = "black"){
		//La función se invoca con el operador new
		if (!new.target) throw new InvalidAccessConstructorException();
		//Llamada al superconstructor.
		super(serial,brand,model,price,description);

		//Validación de argumentos
		if (!/([2-5]G)/.test(band)) throw new InvalidValueException("band",band);
		
		//Atributos privados
		this.#band = band;
		this.#storage = storage;
		this.#color = color;
	}

	get band(){
		return this.#band;
	}
	set band(value){
		this.#band = value;
	}

	get storage(){
		return this.#storage;
	}
	set storage(value){
		this.#storage = value;
	}

	get color(){
		return this.#color;
	}
	set color(value){
		this.#color = value;
	}

	toString (){
		return super.toString() + ",band:" + this.band + ",storage: " + this.storage +
			",color: " + this.color;
	}
}

class Tv extends Product {
	//Atributos privados
	#inches;
	#smart;
	constructor (serial, brand, model, price, description, inches = "0", smart = false){
		//La función se invoca con el operador new
		if (!new.target) throw new InvalidAccessConstructorException();
		//Llamada al superconstructor.
		super(serial,brand,model,price,description);
		
		//Atributos privados
		this.#inches = inches;
		this.#smart = smart;
	}

	get inches(){
		return this.#inches;
	}
	set inches(value){
		this.#inches = value;
	}

	get smart(){
		return this.#smart;
	}
	set smart(value){
		this.#smart = value;
	}

	toString (){
		return super.toString() + ",inches: " + this.inches +
			",smart:" + this.smart;
	}
}

class Laptop extends Product {
	//Atributos privados
	#processor;
	#memory;
	#storage;
	constructor (serial, brand, model, price, description, processor = "unkonwn", memory = "0GB", storage = "0GB"){
		//La función se invoca con el operador new
		if (!new.target) throw new InvalidAccessConstructorException();
		//Llamada al superconstructor.
		super(serial,brand,model,price,description);

		//Validación de argumentos
		if (!processor) throw new EmptyValueException("processor");
		//Atributos privados
		this.#processor = processor;
		this.#memory = memory;
		this.#storage = storage;
	}

	get processor(){
		return this.#processor;
	}
	set processor(value){
		if (!value) throw new EmptyValueException("processor");
		this.#processor = value;
	}

	get memory(){
		return this.#memory;
	}
	set memory(value){
		this.#memory = value;
	}

	get storage(){
		return this.#storage;
	}
	set storage(value){
		this.#storage = value;
	}

	toString (){
		return super.toString() + ",processor:" + this.processor +
			",memory:" + this.memory + ",storage:" + this.storage;
	}

}

class Category {
	#title;
	#description;
	#image;
	constructor (title, description, image){
		if (!title) throw new EmptyValueException('title');
		this.#title = title;
		this.#description = description;
		this.#image = image;
	}

	get title(){
		return this.#title;
	}
	set title(value = 'Anon'){
		if (!value) throw new EmptyValueException('title');
		this.#title = value;
	}
	get description(){
		return this.#description;
	}
	set description(value = ''){
		if (!value) throw new EmptyValueException('description');
		this.#description = value;
	}

	get image(){
		return this.#image;
	}
	set image(value = 'No image'){
		this.#image = image;
	}

	toString (){
		return "title:" + this.title + "," +
			"description:" + this.description + "," + "image:" + this.image;
	}
}
export {Product, Category, Laptop, Smartphone, Tv};