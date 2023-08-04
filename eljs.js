//base de datos local de preguntas
const bd_juego = [
    {
        id:0,
        pregunta:"¿a la administracion se la conoce como?",
        op0:"ciencia, tecnica y arte",
        op1:"Mercadeo",
        op2:"produccion de recursos",
        correcta:"0"
    },
    {
        id:1,
        pregunta:"¿para administrar correctamente se requiere analizar?",
        op0:"las compras",
        op1:"los recursos",
        op2:"la planificacion",
        correcta:"1"
    },
    {
        id:2,
        pregunta:"¿la universalidad es una caracteristica de la administrar ?",
        op0:"si",
        op1:"ninguna",
        op2:"no",
        correcta:"0"
    },
    {
        id:3,
        pregunta:"¿los campos de aplicacion de la administracion son ?",
        op0:"publica,privada y mixta",
        op1:"privada y mixta",
        op2:"formal e informal",
        correcta:"0"
    },
    {
        id:4,
        pregunta:"¿las fases de la administracion son ?",
        op0:"temporal e instrumental",
        op1:"control y seguridad",
        op2:"integrales y de ejecucion",
        correcta:"2"
    },
    {
        id:5,
        pregunta:"¿la organizaciones formales estan representadas por ?",
        op0:"normas, leyes y politicas ",
        op1:"capital e inversion",
        op2:"socios y accionistas ",
        correcta:"0"
    },
    {
        id:6,
        pregunta:"¿cuantos tipos de organizaciones existen?",
        op0:"publica y privada",
        op1:"ascendente y descendente",
        op2:"formal e informal",
        correcta:"2"
    },
    {
        id:7,
        pregunta:"¿la administracion es ?",
        op0:"un organo social encargado de hacer que los recursos sean productivos",
        op1:"cultura y de cordinacion",
        op2:"desarrollo economico",
        correcta:"0"
    },
    {
        id:8,
        pregunta:"¿cuales son los estilos de liderazgo?",
        op0:"ninguna",
        op1:"aristocratico, liberal y democratico",
        op2:"carismatico, lideral y excelente",
        correcta:"1"
    },
    {
        id:9,
        pregunta:"¿la teoria Z propone?",
        op0:"cambio por el cambio",
        op1:"interaccion de procesos",
        op2:"valores morales y eticos ",
        correcta:"2"
    }
]

//para guardar las respuestas elegidas
let respuestas = [];
//cantidad correctas
let cantiCorrectas = 0;
//pregunta acutal que debe ser cargada
let numPregunta = 0;

//Cargo una pregunta del JSON
function cargarPreguntas(){
    //tomo la pregunta actual de la bd
    const pregunta = bd_juego[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

    //vamos a crear los tres labels
    //Lo vamos a hacer mediante una funciòn.
    // A dicha función le envio el numero de label y la opcion
    // el texto, de dicho label
    const label1 = crearLabel("0",pregunta.op0);
    const label2 = crearLabel("1",pregunta.op1);
    const label3 = crearLabel("2",pregunta.op2);

    //agrego los labels al contendor de las opciones
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);

    //agrego las opciones al contenedor principal
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}

//creo la funciòn que que retornará el label con todo su contenido
function crearLabel(num, txtOpcion){
    const label = document.createElement("label");
    label.id = "l" + numPregunta + num;
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta+","+num+")");
    const span = document.createElement("span");
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    span.textContent = txtOpcion;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}

//Mediante un for cargo todas las preguntas del JSON
for(i=0;i < bd_juego.length;i++){
    cargarPreguntas();
    //actualizo el numero de pregunta actual
    numPregunta++;
}

//Función que carga la opción elegida en el arreglo respuestas.
function seleccionar(pos, opElegida){
    respuestas[pos] = opElegida;
}

//botón corregir
let corregir = document.getElementById("corregir");
corregir.onclick = function(){
    //recorro el arreglo que tiene las respuestas y comparo
    for(i=0;i<bd_juego.length;i++){
        //cargo la pregunta
        const pregunta = bd_juego[i];
        if(pregunta.correcta == respuestas[i]){ //respuesta correcta
            cantiCorrectas++;
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta correcta";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }else{//no acerto
            let id = "p" + i + respuestas[i];
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta incorrecta";
            document.getElementById(id).innerHTML = "&#x2715;";
            document.getElementById(id).className = "no-acierto";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }
    }

    //desabilitamos todos los inputs
    let inputs = document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled = true;
    }

    //hacemos un scroll hacia arriba
    window.scrollTo(0,0);
    //colocamos la cantidad que acertoy las que no acertó
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantiCorrectas + " CORRECTAS - " + (10-cantiCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}