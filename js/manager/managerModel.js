let SuperTienda = (function () {
    let instantiated;
    function init(){ //Inicialización del Singleton
		class SuperTienda {
			constructor (){

			}
        }
	}
  return {
    getInstance: function () {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    }
  };
})();

export default SuperTienda;