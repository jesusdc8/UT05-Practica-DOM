import { BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	InvalidValueException,
	AbstractClassException } from '../exceptions.js';

class Shop{
	//definimos atributos privados
	#id; 
	#address;
	#country;
	#city;
	#image;

	constructor(id, address, city, country, image){
		if (!id) throw new EmptyValueException('id');
		this.#id = id;
		this.#address = address;
		this.#city = city;
		this.#country = country;
		this.#image = image;
	}

	//Realizamos los getters
	get id(){
		return this.#id;
	}

	get address(){
		return this.#address;
	}

	get country(){
		return this.#country;
	}

	get city(){
		return this.#city;
	}

	get image(){
		return this.#image;
	}

	set id(value = 'noId'){
		if (!value) throw new EmptyValueException('id');
		this.#id = value;
	}

	set address(value = 'noAddress'){
		this.#address = value;
	}

	set country(value = 'noCountry'){
		this.#country = value;
	}

	set city(value = 'noCity'){
		this.#city = value;
	}

	set image(value = 'noImage'){
		this.#image = value;
	}

	toString(){
		return "id:" + this.id + ",address:" + this.address + ",country:" + this.country + ",city:" + this.city + ",image:" + this.image;
	}

	
}



export {Shop};