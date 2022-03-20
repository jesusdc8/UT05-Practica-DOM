import AuxPageController from "./manager/auxPageController.js";
import AuxPageView from "./manager/auxPageView.js";

window.init = () => {
  new AuxPageController(
    window.model,
    new AuxPageView(),
    window.name
  );
}

// $(function(){
//   cleanMessage();
//   // Title
//   let bTitle = $('<button class="btn btn-primary m-1">Título</button>');
//   bTitle.click(function (event){
//     if (window.opener){
//       showMessage(window.opener.document.title);
//     } else {
//       showMessage('La ventana se ha abierto directamente.');
//     }
//   });
//   $(document.body).append(bTitle);

// 	// Greeting
// 	let bGreeting = $('<button class="btn btn-primary m-1">Saludar</button>');
// 	bGreeting.click(function (event){
// 		if (window.opener){
// 			$(window.opener.document).find('#message').first().text(greeting());
// 			window.opener.focus();
// 		} else {
// 			showMessage('La ventana se ha abierto directamente.');
// 		}
// 	});
// 	$(document.body).append(bGreeting);

// 	// Get Greeting
// 	let bGetGreeting = $('<button class="btn btn-primary m-1">Obtener Saludo</button>');
// 	bGetGreeting.click(function (event){
// 		if (window.opener){
// 			showMessage(window.opener.greeting());
// 		} else {
// 			showMessage('La ventana está cerrada.');
// 		}
// 	});
// 	$(document.body).append(bGetGreeting);

// 	// Close Window
// 	let bClose = $('<button class="btn btn-danger m-1">Cerrar ventana</button>');
// 	bClose.click(function (event){
// 		if (window.opener){
// 			window.close();
// 		} else {
// 			showMessage('Solo podemos cerrar una ventana abierta por código.');
// 		}
// 	});
// 	$(document.body).append(bClose);

// });
