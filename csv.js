"use strict"; // Usar modo estricto ECMAScript 5 en los navegadores que lo soportan

//A tav�s de la funci�n $() JQuery interact�a con la p�gina .
$(document).ready(function() {
	/*La funci�n ready de JQuery ejecuta el c�digo tan pronto como el documento est� listo para ser manipulado*/
   $("Button").click(function() {
   /*La funci�n click de jQuery se ejecuta cada vez que se hace click sobre el elemento Button.
     Al hacerlo, se ejecutar� la funci�n calculate(), encargada de realizar la conversi�n del csv.*/
     calculate();
   });
 });

function calculate() {
  var result;
  var original       = document.getElementById("original");
  var temp = original.value;
  var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g; /*Expresi�n regular que casa con las cadenas de caracteres cuyo principio y/o fin est�n formados por ninguno, uno o varios espacios en blanco, y casan con todas aquellas subcadenas encerradas entre comillas dobles ("") y delimitadas por el car�cter coma (,)*/
  var lines = temp.split(/\n+\s*/); 
  /*permite dividir la cadena almacenando el resultado en un array, en funci�n de un elemento indicador del split,
    en este caso, a cada salto de l�nea (esta expresi�n regular hace que si las l�neas est�n compuestas por espacios vac�os, no lo almacene)*/  
  var commonLength = NaN;
  var r = [];
  // Template realizada usando underscore, en lugar de devolver la funci�n, el valor name se hace inmediato
  var row = "<% _.each(items, function(name) { %>"     +
            "                    <td><%= name %></td>" +
            "              <% }); %>";
  // Almacena localmente el contenido del escrito en el cuadro de texto.
  if (window.localStorage) localStorage.original  = temp;
  
  for(var t in lines) {
    var temp = lines[t];
    var m = temp.match(regexp);
    var result = [];
    var error = false;
    
    if (m) {
      if (commonLength && (commonLength != m.length)) {
        /*alert('ERROR! Revise las dimensiones de la tabla.');*/
        error = true;
      }
      else {
        commonLength = m.length;
        error = false;
      }
      for(var i in m) {
		// removecomma almacena cada palabra separada por comas,eliminando las comas y espacios vac�os
        var removecomma = m[i].replace(/,\s*$/,'');
		// remove1stquote toma las palabras almacenadas en removecomma, les elimina la primera doble comilla (") y las almacena
        var remove1stquote = removecomma.replace(/^\s*"/,'');
		// removelastquote toma las palabras almacenadas en remove1stquote, les elimina la �ltima doble comilla (") y las almacena
        var removelastquote = remove1stquote.replace(/"\s*$/,'');
		// removeescapedquotes toma las palabras almacenadas removelastquote, les elimina el doble '\' y las almacena
        var removeescapedquotes = removelastquote.replace(/\\"/,'"');
		// La cadena resultante de las operaciones anteriores es almacenada en el array result
        result.push(removeescapedquotes);
      }
      var tr = error? '<tr class="error">' : '<tr>';
      r.push(tr+_.template(row, {items : result})+"</tr>");
    }
    else {
      alert('ERROR! El formato CSV es incorrecto');
      error = true;
    }
  }
  r.unshift('<p>\n<table class="center" id="result">');
  r.push('</table>');
  finaltable.innerHTML = r.join('\n');
}
// window.onload Se asegura que el c�digo siguiente se ejecute despu�s de que el navegador termine de cargar el documento
window.onload = function() {
  // Suponiendo que el navegador soporte localStorage, guarda localmente los datos introducidos
  if (window.localStorage && localStorage.original) {
    document.getElementById("original").value = localStorage.original;
  }
};
