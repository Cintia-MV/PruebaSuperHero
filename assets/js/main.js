$(document).ready(() => {
    $("form").submit((event) => {
        event.preventDefault();
        let valueInput = $("#txtId").val();

        $.ajax({
            type: "get",
            url: `https://www.superheroapi.com/api.php/3525635500807579/${valueInput}`,
            dataType: "json",
            success: function (superHero) {
                var nombre = superHero.name;
                let imagen = superHero.image.url;
                let conexiones = superHero.connections["group-affiliation"];
                let biografia = superHero.biography.publisher;
                let ocupacion = superHero.work.occupation;
                let primeraAparicion = superHero.biography["first-appearance"];
                let altura = superHero.appearance.height;
                let peso = superHero.appearance.weight;
                let alianzas = superHero.biography.aliases;

                console.log(superHero);
                crearGrafico(superHero);
                for (let i = 0; i < superHero.powerstats.length; i++) {
                    console.log(`${pokemon.stats[i].stat.name} ${pokemon.stats[i].base_stat}`);
                }

                $('#nombreHero').html(`
                <div class="card mb-3" style="max-width: 540px;">
                <div class="row no-gutters">
                <div class="col-md-4">
                     <img src="${imagen}">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Nombre: ${nombre}</h5>
                  <p class="card-text">Conexiones: ${conexiones}</p>
                  <p class="card-text">Publicado por: ${biografia}</p>
                  <p class="card-text">Ocupación: ${ocupacion}</p>
                  <p class="card-text">Primera aparición: ${primeraAparicion}</p>
                  <p class="card-text">Altura: ${altura[0]} - ${altura[1]}</p>
                  <p class="card-text">Peso: ${peso[0]} - ${peso[1]}</p>
                  <p class="card-text">Alianzas: ${alianzas.join(", ")}</p>
                </div>
              </div>
                 </div>
                </div>

                `)




            }
        });


    });
});

const crearGrafico = (heroRecibido) => {
    let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "dark2",
        title: {
            text: `Estadisticas de Poder para ${heroRecibido.name}`
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: [
                { y: heroRecibido.powerstats.combat, label: "Combat"},
                { y: heroRecibido.powerstats.durability, label: "Durability"},
                { y: heroRecibido.powerstats.intelligence, label: "Intelligence"},
                { y: heroRecibido.powerstats.power, label: "Power"},
                { y: heroRecibido.powerstats.speed, label: "Speed"},
                { y: heroRecibido.powerstats.strength, label: "Strength"},
            ]
        }]
    });
    chart.render();
}




/* const btnBuscar = document.querySelector('#btnBuscar');
const datoInput = document.querySelector('#txtId');
btnBuscar.addEventListener('click', (event) => {
    event.preventDefault();

   
}); */



