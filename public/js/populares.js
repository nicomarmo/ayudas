window.onload = function(){
    fetch("https://api.giphy.com/v1/gifs/trending?api_key=fPDtK3cO1jMnARTPV3gTwHu7AEIc4vnj&limit=25&rating=g")
        .then(function(respuesta){
            return respuesta.json();
        })
        .then(function(informacion){
            console.log(informacion)
            for(let i = 0; i<informacion.data.length; i++){
                let gif = "<p>" +informacion.data[i].title+ "</p>";
                gif += "<img src="+ informacion.data[i].images.original.url + ">"

                document.querySelector("ul").innerHTML += "<li>" + gif + "<li/>"
            }
        })
        .catch(function(e){
            alert("error puto");
        })
    }
// no se porque pero no levanta la API si la linkeo
// desde este archivo (una verga las APIS)