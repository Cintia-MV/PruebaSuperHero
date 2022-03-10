//EVENTO PARA CAPTURAR INFORMACIÓN
$(document).ready(() => {
    $("form").submit((event) => {
        event.preventDefault();

        //VALIDAR INFORMACIÓN CAPTURADA
        let valueInput = $("#txtId").val();
        let regex = new RegExp(/\d+/);
        if (regex.test(valueInput)) {

            //API SUPERHERO MEDIANTE AJAX
            $.ajax({
                type: "get",
                url: `https://www.superheroapi.com/api.php/3525635500807579/${valueInput}`,
                dataType: "json",
                success: function (superHero) {

                    //VARIABLES CON INFORMACIÓN REQUERIDA DE SUPER HEROES
                    let nombre = superHero.name;
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

                    //CICLO PARA RECORRER ARREGLOS Y OBJETOS                    
                    for (let i = 0; i < superHero.powerstats.length; i++) {
                    };

                    //TARJETAS DE BOOTSTRAP
                    $('#nombreHero').html(`
                    <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                      <div class="col-5">
                        <img src="${imagen}" class="img-fluid" alt="imagenSuperHero">
                      </div>
                      <div class="col-7">
                        <div class="card-body">
                          <h5 class="card-title">${nombre}</h5>
                          <p class="card-text"  style="font-family: comic neue; font-size: small">${conexiones}</p>
                        </div>
                        <ul class="list-group list-group-flush"  style="font-family: comic neue; font-size: small">
                                <li class="list-group-item">Publicado por: ${biografia}</li>
                                <li class="list-group-item">${ocupacion}</li>
                                <li class="list-group-item">Primera aparición: ${primeraAparicion}</li>
                                <li class="list-group-item">Altura: ${altura[0]} - ${altura[1]}</li>
                                <li class="list-group-item">Peso: ${peso[0]} - ${peso[1]}</li>
                                <li class="list-group-item">Alianzas: ${alianzas.join(", ")}</li>
                            </ul>
                      </div>
                    </div>
                  </div>
                  `);

                }
            });
        } else {
            alert('Debes ingresar un número')
        };

    });
});

//GRÁFICO CREADO MEDIANTE CANVAS JS
const crearGrafico = (heroRecibido) => {
    let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "dark2",
        title: {
            text: `Estadisticas de Poder para ${heroRecibido.name}`
        },
        legend: {
            cursor: "pointer",
        },
        data: [{
            type: "pie",

            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",

            dataPoints: [
                { y: heroRecibido.powerstats.combat, label: "Combat" },
                { y: heroRecibido.powerstats.durability, label: "Durability" },
                { y: heroRecibido.powerstats.intelligence, label: "Intelligence" },
                { y: heroRecibido.powerstats.power, label: "Power" },
                { y: heroRecibido.powerstats.speed, label: "Speed" },
                { y: heroRecibido.powerstats.strength, label: "Strength" },
            ]
        }]
    });
    chart.render();
}
