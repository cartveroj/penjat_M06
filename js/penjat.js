let partidasGanadas = 0;
let partidasPerdidas = 0;
function elPenjat(){
    while(true){
        seleccionUsuario = prompt("Introduzca una opcion: "+"\n"+"1.- Iniciar juego "+
        "\n"+"2.- Estadisticas "+"\n"+"3.- Salir");
        if(seleccionUsuario == 1){
            palabra = prompt("Introduzca una palabra").toUpperCase();
            let palabraCorrecta = validacionPalabra(palabra);
            if(palabraCorrecta){
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

function esconderPalabra(palabra){
    let palabraOculta = "";
    for(let i=0; i< palabra.length ; i++){
        palabraOculta = "_" + palabraOculta; 

    }
    return palabraOculta.split('');
}

function consola(palabra, palabraOculta){
    let letra='';
    let letrasEquivocadas="";
    let letrasAdivinadas = "";
    let intentos = 0;
    let numeroMaxIntentos = 6;
    let esLetra = "";
    let partidaGanada = false;
    console.log(palabraOculta);
    while(intentos < numeroMaxIntentos ){
        letra = prompt("Introduzca una letra").toUpperCase();
        if(letra.length > 1){
            alert("Solo se acepta una letra")
        }else{
            esLetra = letra.match(/[A-Z]/i); 
            if(esLetra != null){
                let match = palabra.match(letra);
                if(match != null){
                    letrasAdivinadas = matchLetrasDentroPalabra(palabra, letra, palabraOculta);
                    if(letrasAdivinadas.join("") === palabra){
                        console.log(letrasAdivinadas);
                        alert("Adivinaste la palabra.¡")
                        partidaGanada = true;
                        break;
                    }  
                }else{
                    letrasEquivocadas = esLetra+"," + letrasEquivocadas;
                    intentos++;
                }
                if(letrasAdivinadas.length === 0){
                    console.log(palabraOculta);
                }else{
                    console.log(letrasAdivinadas);
                }
                let ListadoletrasEquivocadas = (letrasEquivocadas.length > 0) ? letrasEquivocadas.substring(0,letrasEquivocadas.length-1) : "0 ";
                console.log("Letras equivocadas " +intentos +"/"+numeroMaxIntentos +": " + ListadoletrasEquivocadas  );
            }
        }  
    }
    if(partidaGanada){
        partidasGanadas++;
        
    }else{
        alert("Mor penjat");
        partidasPerdidas++;
    }

}

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

function validacionPalabra(palabra){
    let palabraCorrecta = true;
   if(palabra.trim().length == 0){
    palabraCorrecta = false;
   }

   return palabraCorrecta;
}