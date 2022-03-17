window.addEventListener("load", function(){
    let messiPic = document.querySelector(".messiPic")
    messiPic.addEventListener("click", function(){
        alert("tocaste la foto de la pulguita!")
    })
    let titulo = document.querySelector(".titulo")
    titulo.addEventListener("click", function(){
        alert("este es el titulo pulguita!")
    })
    let homeButton = document.querySelector(".homeButton")
    homeButton.addEventListener("click", function(){
        homeButton.style.color = "red"
    })
    let prueba1 = document.querySelector(".prueba1")
    prueba1.addEventListener("click", function(){
        prueba1.style.color = prompt("elegite un color pulguita");
    })
    let prueba2 = document.querySelector(".prueba2")
    prueba2.addEventListener("mouseover", function(){
        prueba2.style.color = "violet"
    })
    let prueba3 = document.querySelector(".prueba3")
    prueba3.addEventListener("mouseout", function(){
        prueba3.style.color = "blue"
    })
    let botones = document.querySelectorAll(".botones")
    for(let i = 0; i < botones.length; i++){
        botones[i].addEventListener("click", function(){
            this.style.color = "grey" //tambien se puede usar botones[i].style.color...
        })
    }
    window.addEventListener("keypress", function(e){
        if (e.key == "Enter"){
            alert("e puto que tocas enter")
        }
    })
})




/*const titulo = document.querySelector("h2")
titulo.innerHTML += "<i>Lionel Messi</i>";

titulo.classList.add('tituloDestacado');
let confirmarEliminacion = confirm('estas seguro de eliminar?');

if (confirmarEliminacion) {
    titulo.classList.remove('tituloDestacado');
}*/


//Crear Cancion
window.addEventListener("load", function(){
    let formulario = document.querySelector("form.formulario")
    formulario.addEventListener("submit", function(e){

        let errores = [];

        let campoTitulo = document.querySelector("input.titulo")
        if(campoTitulo.value == ""){
            errores.push("tenes que ponerle nombre al tema burro");
        }
        let campoCompositor = document.querySelector("input.compositor")
        if(campoCompositor.value == ""){
            errores.push("y quien lo canta? ");
        }

        if(errores.length > 0){
            e.preventDefault();
            let ulErrores = document.querySelector("div.errores ul")
            for(let i = 0; i < errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }
    });
})

window.addEventListener("load", function(){ 
    if(sessionStorage.getItem("nombreUsuario") == null){
        let nombre = prompt("cual es tu nombre?");
        document.querySelector(".bienvenida").innerHTML = "Hola " + nombre
        sessionStorage.setItem("nombreUsuario", nombre)
    } else {
        let nombre = sessionStorage.getItem("nombreUsuario")
        document.querySelector(".bienvenida").innerHTML = "Hola " + nombre
//sessionStorage se borra cuando salgo del navegador
//localStorage se guarda para siempre, solo texto 
    }
    
});
