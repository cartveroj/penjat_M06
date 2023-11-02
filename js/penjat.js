function elPenjat(){
    console.log(
        "1.-Iniciar juego"+
        "2.-Estadisticas"+
        "3.-Salir"
    ); 
    while(true){
        seleccionUsuario = prompt("Introduzca una opcion (1,2,3)");
        if(seleccionUsuario == 1){
            let palabra = prompt("Introduzca una palabra");
            console.log(esconderPalabra(palabra));
            break;
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
        palabraOculta = palabra.replace(palabra.charAt(i),'_');
    }
    return palabraOculta;
}