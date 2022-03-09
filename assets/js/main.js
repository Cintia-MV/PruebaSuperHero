$(document).ready( ()=>{
    $("form").submit((event)=>{
        event.preventDefault();
        let valueInput =$("#txtId").val();

         $.ajax({
        type: "get",
        url: `https://www.superheroapi.com/api.php/3525635500807579/${valueInput}`,
        dataType: "json",
        success: function (superHero) {
            console.log(superHero)

        }
    });


    });
});

/* const btnBuscar = document.querySelector('#btnBuscar');
const datoInput = document.querySelector('#txtId');
btnBuscar.addEventListener('click', (event) => {
    event.preventDefault();

   
}); */



