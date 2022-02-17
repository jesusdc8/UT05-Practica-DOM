import { BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	InvalidValueException,
	AbstractClassException } from '../exceptions.js';

class Shop{

	//en esta clase no vamos a definir setters ya que los atributos del objeto shop son constantes.
	//Hemos incluido el atributo id, ya que ofrece la posibilidad escalable de que en una misma ciudad existan 2 tiendas.
	//aunque podrían distinguirse por address, he considerado que sería más manejable utilizar un id.

	//definimos atributos privados
	#id= 0; //inicializamos id que va a ser auto incrementador
	#address;
	#country;
	#city;

	constructor(id = id++){
		this.#address = address;
		this.#city = city;
		this.#country = country;
	}

	//Realizamos los getters
	getId(){
		return this.#id;
	}

	getAddress(){
		return this.#address;
	}

	getCountry(){
		return this.#country;
	}

	getCity(){
		return this.#city;
	}


}

export {Shop};