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

    constructor (serial, brand, model, price){
        this.#serial = serial;
		this.#brand = brand;
		this.#model = model;
		this.#price = price;
    }

    // constructor (serial, brand, model, price, description){
    //     this.#serial = serial;
	// 	this.#brand = brand;
	// 	this.#model = model;
	// 	this.#price = price;
    //     this.#description = description;
    // }

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
		return "Serial: " + this.serial + " Brand: " + this.brand + " Model: " + this.model + " Price: " + this.price + " Description: " + this.description;
	}
}

class Category {
	#title;
	#description;
	constructor (title, description){
		if (!title) throw new EmptyValueException('title');

		this.#title = title;
		this.#description = description;
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
}
export {Product, Category};