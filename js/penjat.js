let partidasGanadas = 0;
let partidasPerdidas = 0;

function iniciarPartida(){

    let palabraCorrecta = false;
    while(!palabraCorrecta){
        palabra = prompt("Introduzca una palabra").toUpperCase();
        palabraCorrecta = validacionPalabra(palabra);
        if(!palabraCorrecta){
            alert('Introduzca una palabra válida')
        }
    }
    let palabraOculta = esconderPalabra(palabra);
    palabraAadivinar(palabraOculta);
    botonesabecedario();
   // consola(palabra, palabraOculta);    
}

function botonesabecedario(){
    const abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
    for(var i = 0; i< abecedario.length; i++){
        let button = document.createElement('button');
        button.id= 'btnLetra';
        button.value= "'"+abecedario.charAt(i)+"'";
        //console.log();
        button.textContent=abecedario.charAt(i);
        document.querySelector('#abecedario').appendChild(button);
    }
}


function image(){
    let path ="";
    let img = document.createElement('img');
}

function palabraAadivinar(palabraOculta){
    
    let lineas = document.createElement('p');
    lineas.textContent= palabraOculta.join(" ");
    document.querySelector('#jocPenjat').appendChild(lineas);
    botonesabecedario();
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
   
    while(intentos < numeroMaxIntentos  ){ 
        const botonesabecedario = document.querySelector('#btnLetras');
        const cuandoSeHaceClick = function (evento) {
            // Recuerda, this es el elemento
            console.log("El texto que tiene es: ", this.innerText);
        
            // Podemos cambiar cualquier cosa, p.ej. el estilo
            this.style.borderColor = "blue";
        }
        // botones es un arreglo así que lo recorremos
        botones.forEach(botonesabecedario => {
            //Agregar listener
            botonesabecedario.addEventListener("click", cuandoSeHaceClick);
        });
        if(letra != null){
            let match = palabra.match(letra);
            if(match != null){
                letrasAdivinadas = matchLetrasDentroPalabra(palabra, letra, palabraOculta);
                if(letrasAdivinadas.join("") === palabra){
                    palabraAadivinar(letrasAdivinadas);
                    alert("Adivinaste la palabra.¡")
                    partidaGanada = true;
                    break;
                }  
            }else{
                letrasEquivocadas = esLetra+"," + letrasEquivocadas;
                intentos++;
            }
            if(letrasAdivinadas.length === 0){
                // console.log(palabraOculta);
                palabraAadivinar(palabraOculta);
            }else{
                //console.log(letrasAdivinadas);
                palabraAadivinar(letrasAdivinadas);
            }

            let ListadoletrasEquivocadas = (letrasEquivocadas.length > 0) ? letrasEquivocadas.substring(0,letrasEquivocadas.length-1) : "0 ";
            console.log("Letras equivocadas " +intentos +"/"+numeroMaxIntentos +": " + ListadoletrasEquivocadas  );
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