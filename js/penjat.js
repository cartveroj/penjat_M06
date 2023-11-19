//declaracion de variables globales
let partidasGanadas = 0;
let partidasPerdidas = 0;

//inicializa el juego y en funcion a la seleccion realiza una opcion
function elPenjat(){
    while(true){
        seleccionUsuario = prompt("Introduzca una opcion: "+"\n"+
        "1.- Iniciar juego "+
        "\n"+"2.- Estadisticas "
        +"\n"+"3.- Salir");
        if(seleccionUsuario == 1){
            palabra = prompt("Introduzca una palabra").toUpperCase();
            if(validacionPalabra(palabra)){
                let palabraOculta = esconderPalabra(palabra);
                consola(palabra, palabraOculta);
            }else{
                alert("Valor incorrecto");
            }
            
        }
        if(seleccionUsuario == 2){
            informeEstadisticas();
            break;
        }
        if(seleccionUsuario == 3){
            break;
        }
    }
}

//reemplaza la palabra ingresada por lineas
function esconderPalabra(palabra){
    let palabraOculta = "";
    for(let i=0; i< palabra.length ; i++){
        palabraOculta = "_" + palabraOculta; 

    }
    return palabraOculta.split('');
}
// Funcion principal, es la funcion que realiza todo el juego 
function consola(palabra, palabraOculta) {

    let letra = '';
    let letrasEquivocadas = "";
    let letrasAdivinadas = "";
    let intentos = 0;
    let numeroMaxIntentos = 6;
    let esLetra = "";
    let partidaGanada = false;

    // Muestra la palabra oculta en la consola
    console.log(palabraOculta);

    // Bucle principal del juego
    while (intentos < numeroMaxIntentos) {
        // Solicita al usuario que introduzca una letra
        letra = prompt("Introduzca una letra").toUpperCase();

        // Validación de entrada: asegura que solo se ingrese una letra
        if (letra.length > 1) {
            alert("Solo se acepta una letra");
        } else {
            // Validación de entrada: asegura que la entrada sea una letra
            esLetra = letra.match(/[A-Z]/i);

            if (esLetra != null) {
                // Comprueba si la letra está en la palabra
                let match = palabra.match(letra);

                if (match != null) {
                    // Actualiza las letras adivinadas y verifica si se ha adivinado toda la palabra
                    letrasAdivinadas = matchLetrasDentroPalabra(palabra, letra, palabraOculta);
                    if (letrasAdivinadas.join("") === palabra) {
                        console.log(letrasAdivinadas);
                        alert("Adivinaste la palabra.¡");
                        partidaGanada = true;
                        break;
                    }
                } else {
                    // Actualiza las letras equivocadas y aumenta el contador de intentos
                    letrasEquivocadas = esLetra + "," + letrasEquivocadas;
                    intentos++;
                }

                // Muestra las letras adivinadas o la palabra oculta en la consola
                if (letrasAdivinadas.length === 0) {
                    console.log(palabraOculta);
                } else {
                    console.log(letrasAdivinadas);
                }

                // Muestra las letras equivocadas y la información sobre los intentos en la consola
                let ListadoletrasEquivocadas = (letrasEquivocadas.length > 0) ? letrasEquivocadas.substring(0, letrasEquivocadas.length - 1) : "0 ";
                console.log("Letras equivocadas " + intentos + "/" + numeroMaxIntentos + ": " + ListadoletrasEquivocadas);
            }
        }
    }

    // Determina el resultado de la partida y actualiza las estadísticas
    if (partidaGanada) {
        partidasGanadas++;
    } else {
        alert("Mor penjat");
        partidasPerdidas++;
    }
}

// Añade la letra a las posiciones correspondientes en la palabra oculta
function matchLetrasDentroPalabra(palabra, letra, palabraOculta){
    let arrayPalabra = palabra.split('');
    for(let i=0 ; i < arrayPalabra.length ; i++){
        let match = palabra[i].match(letra);
        if( match != null){
            palabraOculta[i] = letra;
        }
    }
    return palabraOculta;
}
// Función principal que muestra el informe por consola
function informeEstadisticas(){
    let totalPartidas = parseInt(partidasGanadas + partidasPerdidas);
    let calcPorcentajeGanadas = Math.trunc(partidasGanadas * 100 / totalPartidas);
    let porcentajeGanadas = (calcPorcentajeGanadas != null)? calcPorcentajeGanadas:0;
    let calcPorcentajePerdidas = Math.trunc(partidasPerdidas * 100 / totalPartidas);
    let porcentajePerdidas = (calcPorcentajePerdidas != null)? calcPorcentajePerdidas :0;
    console.log("Total partidas jugadas: "+ totalPartidas +"\n");
    console.log("Partidas ganadas ("+porcentajeGanadas+"%): "+ partidasGanadas);
    console.log("Partidas perdidas ("+porcentajePerdidas+"%): "+ partidasPerdidas);
}

// Valida que la palabra ingresada sea válida
function validacionPalabra(palabra){
    let palabraCorrecta = true;
   if(palabra.trim().length == 0){
    palabraCorrecta = false;
   }

   return palabraCorrecta;
}