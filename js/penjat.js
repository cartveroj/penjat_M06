let partidasGanadas = 0;
let partidasPerdidas = 0;
let palabraActual = '';
let palabraOcultaActual = "''";
let palabraOculta = [];
let letrasEquivocadas = [];
let intentos = 0;

function clickLletra(letra){
    verificarLetra(letra)
}

function getPalabra(){
    return palabraActual;
}
function getPalabraOculta(){
    return palabraOculta;
}
function iniciarPartida(){
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

function verificarLetra(letra){
    let palabra = getPalabra();
    let palabraOculta = getPalabraOculta();
    let match = palabra.includes(letra);
        if(match){
            palabraOculta = matchLetrasDentroPalabra(palabra, letra, palabraOculta);
            palabraAadivinar(palabraOculta);
            if(palabraOculta.join("") === palabra) {
                partidasGanadas++;
                alert("ganaste..¡¡");
            }
        }else{
            letrasEquivocadas.push(letra);
            let mensajeLetrasEquivocadas = "Letras equivocadas: " + letrasEquivocadas.join(", ");
            mostrarTexto(mensajeLetrasEquivocadas);
            intentos++
            imagenesPenjat(intentos);
            if (intentos >= 6) {
                alert("¡Mort!");
                partidasPerdidas++;
            }
        }
}

function crearBotonesAbecedario() {
    const abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    let lineaBtn = '';
    for (var i = 0; i < abecedario.length; i++) {
      lineaBtn += `<button onclick="clickLletra(\'${abecedario.charAt(i)}\')">${abecedario.charAt(i)}</button>`;
    }
    document.getElementById('abecedario').innerHTML = lineaBtn;
}

function cambioDeImagen(imagen){
    document.getElementById('imgPenjat').src = imagen;
}

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

function palabraAadivinar(palabraOculta){
    let textoPalabra = `<p>${palabraOculta.join(" ")}</p>`;
    document.getElementById('jocPenjat').innerHTML = textoPalabra;
}

function mostrarTexto(mensaje){
    let textoLetrasEquivocadas = `<p>${mensaje}</p>`;
    document.getElementById('text').innerHTML = textoLetrasEquivocadas;
}
function esconderPalabra(palabra){
    let palabraOculta = "";
    for(let i=0; i< palabra.length ; i++){
        palabraOculta = "_" + palabraOculta; 

    }
    return palabraOculta.split('');
}

function matchLetrasDentroPalabra(palabra, letra, palabraOculta){
    let arrayPalabra = palabra.split('');
    for (let i = 0; i < arrayPalabra.length; i++) {
        if (arrayPalabra[i] === letra) {
            palabraOculta[i] = letra;
        }
    }
    return palabraOculta;
}


function validacionPalabra(palabra){
    let palabraCorrecta = true;
   if(palabra.trim().length == 0){
    palabraCorrecta = false;
   }
   return palabraCorrecta;
}