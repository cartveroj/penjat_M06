/*
Logica de javaScript del juego del ahorcado
*/
//definicion de variables globales
let partidasGanadas = 0;
let partidasPerdidas = 0;

let palabraActual = '';
let palabraOcultaActual = "";
let palabraOculta = [];
let letrasEquivocadas = [];
let intentos = 0;

//funcion que se llama desde boton creado dinamicamente del abecedario
//una vez clickado el boton se deshabilita 
function clickLletra(letra){
    verificarLetra(letra);
    document.getElementById(`btnLetra${letra}`).disabled = true;
    
}

//funcion que retorna la palabra con la que se esta jugando
function getPalabra(){
    return palabraActual;
}
// Obtiene la palabra oculta con las letras adivinadas
function getPalabraOculta(){
    return palabraOculta;
}

//Funcion principal es el que ejecuta todo el juego
// Inicia una nueva partida
function iniciarPartida(){
    // al emplear la opcion none al hacer click en informe() 
    // empleamos la opcion block para que los elementos vuelvan 
    // a ser visibles en la interfaz del usuario
    document.getElementById('imgPenjat').style.display = 'block';
    document.getElementById('jocPenjat').style.display = 'block';
    document.getElementById('text').style.display = 'block';
    document.getElementById('abecedario').style.display = 'block';
    
    let palabraCorrecta = false;
    intentos = 0;
    letrasEquivocadas = [];
    mostrarTexto(letrasEquivocadas);
    while(!palabraCorrecta){
        palabra = prompt("Introduzca una palabra").toUpperCase();
        palabraCorrecta = validacionPalabra(palabra);
        if(!palabraCorrecta){
            alert('Introduzca una palabra válida')
        }
    }

    palabraActual = palabra;
    palabraOculta = esconderPalabra(palabra);
    palabraAadivinar(palabraOculta);
    crearBotonesAbecedario(); 
    imagenesPenjat(intentos);
}
// Verifica si la letra está en la palabra y actualiza el estado del juego
function verificarLetra(letra){
    let numeroMaxIntentos = 6;
    let palabra = getPalabra(); //recuperamos la palabra
    let palabraOculta = getPalabraOculta(); //recuperamos la palabraOculta
    
    let match = palabra.includes(letra);// verificamos si tiene la letra dentro de la palabra
        if(match){
            palabraOculta = matchLetrasDentroPalabra(palabra, letra, palabraOculta);
            palabraAadivinar(palabraOculta);
            if(palabraOculta.join("") === palabra) {
                partidasGanadas++;
                alert("Ganaste..¡¡")
                bloquearBotones();
            }
        }else{
            intentos++
            letrasEquivocadas.push(letra);
            if(letrasEquivocadas.length <= numeroMaxIntentos){
                let mensajeLetrasEquivocadas = "Letras equivocadas "+intentos +"/"+numeroMaxIntentos+ ": "+letrasEquivocadas.join(", ");
                mostrarTexto(mensajeLetrasEquivocadas);
                imagenesPenjat(intentos);
                if (intentos >= 6) {
                    alert("¡Ahorcado..!");
                    partidasPerdidas++;
                    bloquearBotones();
                }
            }
        }
}
// Crea botones con las letras del abecedario una vez ingresada la letra
function crearBotonesAbecedario() {
    const abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    let lineaBtn = '';
    for (var i = 0; i < abecedario.length; i++) {
      lineaBtn += `<button id="btnLetra${abecedario.charAt(i)}" onclick="clickLletra(\'${abecedario.charAt(i)}\')">${abecedario.charAt(i)}</button>`;
    }
    document.getElementById('abecedario').innerHTML = lineaBtn;
}

// Cambia la imagen del ahorcado en la parte gráfica
function cambioDeImagen(imagen){
    document.getElementById('imgPenjat').src = imagen;
}
// Cambia la imagen del ahorcado según los intentos
function imagenesPenjat(intentos){
    let pathImg = "";
    switch(intentos){
        case 0 : pathImg = "./img_penjat/penjat_0.png";
                cambioDeImagen(pathImg);
                break;
        case 1 : pathImg = "./img_penjat/penjat_1.png";
                cambioDeImagen(pathImg);
                break;
        case 2 : pathImg = "./img_penjat/penjat_2.png";
                cambioDeImagen(pathImg);
                break;
        case 3 : pathImg = "./img_penjat/penjat_3.png";
                cambioDeImagen(pathImg);
                break;
        case 4 : pathImg = "./img_penjat/penjat_4.png";
                cambioDeImagen(pathImg);
                break;
        case 5 : pathImg = "./img_penjat/penjat_5.png";
                cambioDeImagen(pathImg);
                break;
        case 6 : pathImg = "./img_penjat/penjat_6.png";
                cambioDeImagen(pathImg);
                break;

    }
}
// Muestra la palabra que se esta jugando en la interfaz
function palabraAadivinar(palabraOculta){
    let textoPalabra = `<p>${palabraOculta.join(" ")}</p>`;
    document.getElementById('jocPenjat').innerHTML = textoPalabra;
}
// Muestra las letras equivocadas en la interfaz
function mostrarTexto(mensaje){
    let textoLetrasEquivocadas = `<p>${mensaje}</p>`;
    document.getElementById('text').innerHTML = textoLetrasEquivocadas;
}
// Esconde la palabra, mostrando guiones bajos en lugar de letras
function esconderPalabra(palabra){
    let palabraOculta = "";
    for(let i=0; i< palabra.length ; i++){
        palabraOculta = "_" + palabraOculta; 

    }
    return palabraOculta.split('');
}
// Añade la letra a las posiciones correspondientes en la palabra oculta
function matchLetrasDentroPalabra(palabra, letra, palabraOculta){
    let arrayPalabra = palabra.split('');
    for (let i = 0; i < arrayPalabra.length; i++) {
        if (arrayPalabra[i] === letra) {
            palabraOculta[i] = letra;
        }
    }
    return palabraOculta;
}

// Valida que la palabra ingresada sea válida que no sea vacia
function validacionPalabra(palabra){
    let palabraCorrecta = true;
   if(palabra.trim().length == 0){
    palabraCorrecta = false;
   }
   return palabraCorrecta;
}
//funcion que se encarga de bloquear los botones del abecedario
function bloquearBotones() {
    const abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    for (let i = 0; i < abecedario.length; i++) {
        document.getElementById(`btnLetra${abecedario.charAt(i)}`).disabled = true;
    }
}
// Función principal que muestra el informe en una nueva ventana
function informe(){
    // oculta visualmente las diferentes partes de la interfaz del 
    // juego cuando se llama a la función informe()
    document.getElementById('imgPenjat').style.display = 'none';
    document.getElementById('jocPenjat').style.display = 'none';
    document.getElementById('text').style.display = 'none';
    document.getElementById('abecedario').style.display = 'none';

    definicionLocalStorage();

    let informe=localStorage.getItem("informe");
    let ventanaInformes = window.open('','_blank',"scrollbars=yes,resizable=yes,width=480,height=200,");
    ventanaInformes.document.write('<html><head><title>Informe de Partidas</title></head><body>');
    ventanaInformes.document.write('<button onclick="borrarLocalStorageVentanaNueva()">Borrar Datos</button>');
    ventanaInformes.document.write('<pre>' + informe + '</pre>');
    ventanaInformes.document.write('<a href="#" onclick="volverAlJuego();">back</a>');
    ventanaInformes.document.write('<script src="./js/penjat.js"></script>')
    ventanaInformes.document.write('</body></html>');
    ventanaInformes.document.close();
    

      
}
// Genera el informe de partidas y lo almacena en localStorage
function definicionLocalStorage(){
    let totalPartidas = partidasGanadas + partidasPerdidas;

    let porcentajeGanadas =(totalPartidas === 0) ? 0 : Math.trunc(partidasGanadas * 100 / totalPartidas);;
    let porcentajePerdidas = (totalPartidas === 0) ? 0 : Math.trunc(partidasPerdidas * 100 / totalPartidas);

    let informeText='<strong>Informe de partidas:</strong>\n' +
                    'Total partidas: ' + totalPartidas + '\n' +
                    'Partidas ganadas ('+ porcentajeGanadas+'%): ' + partidasGanadas + '\n' +
                    'Partidas perdidas ('+ porcentajePerdidas+'%): ' + partidasPerdidas + '\n';

    localStorage.setItem('informe',informeText);

}

// cierra la ventana
function volverAlJuego(){
    window.close();
}
// Escucha eventos de mensajes, especialmente aquellos enviados desde ventanas secundarias
window.addEventListener('message', function (event) {
    // Verifica si el mensaje recibido es para borrar el localStorage
    if (event.data === 'borrarLocalStorage') {
        // Elimina el item 'informe' del localStorage
        window.localStorage.removeItem('informe');
        // Reinicia las variables globales del juego
        partidasGanadas = 0;
        partidasPerdidas = 0;
        // Muestra un mensaje informativo
        alert('Los datos seran eliminados');
    }
});
// Función para borrar el localStorage desde una nueva ventana
function borrarLocalStorageVentanaNueva(){
    // Envía un mensaje al script de la ventana principal para borrar el localStorage
    window.opener.postMessage('borrarLocalStorage', '*');
     // Espera 200 milisegundos y luego cierra la ventana actual
    setTimeout( () => { window.close();}, 200);
}




