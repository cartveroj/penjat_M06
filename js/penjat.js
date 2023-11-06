function elPenjat(){
    console.log(
        "1.-Iniciar juego"+
        "2.-Estadisticas"+
        "3.-Salir"
    );    
    while(true){
        seleccionUsuario = prompt("Introduzca una opcion (1,2,3)");
        if(seleccionUsuario == 1){
            palabra = prompt("Introduzca una palabra").toUpperCase();
            palabraOculta = esconderPalabra(palabra);
            consola();
        }
        if(seleccionUsuario == 2){
            console.log("dentro de opcion 2");
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

function consola(){
    let letra='';
    let letrasEquivocadas="";
    let letrasAdivinadas = "";
    let contador = 0;
    let numeroMaxIntentos = 6;
    let esLetra = "";
    while(letra != ' ' & contador <= 6 ){
        letra = prompt("Introduzca una letra").toUpperCase();
        if(letra.length > 2){
            alert("Solo se acepta una letra")
        }else{
            esLetra = letra.match(/[A-Z]/i); 
            // console.log(esLetra);
            if(esLetra != null){
                console.log("match"+palabra);
                match = palabra.match(letra);
                if(match != null){
                    letrasAdivinadas = matchLetrasDentroPalabra(palabra, letra, palabraOculta);
                    contador++;
                    console.log(letrasAdivinadas);
                    if(letrasAdivinadas === palabra){
                        console.log("Adivino");
                        break;
                    }else{
                        letrasAdivinadas = matchLetrasDentroPalabra(palabra, letra, letrasAdivinadas);
                    }
                    console.log(letrasAdivinadas);
                }else{
                    contador++;
                    letrasEquivocadas = esLetra + letrasEquivocadas;
                    console.log("Letras equivocadas: " + letrasEquivocadas + " numero de intentos: "+ contador +"/"+numeroMaxIntentos ) 
                }
            }
        }  
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