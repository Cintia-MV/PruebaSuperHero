$(document).ready(() => {
    $("form").submit((event) => {
        event.preventDefault();
        let valueInput = $("#txtId").val();
        let regex = new RegExp(/\d+/); 
        if (regex.test(valueInput)) { 
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
                    }

                    $('#nombreHero').html(`
                 <div class="card">
                    <div class="row no-gutters">
                        <div class="col-md-2">
                            <img src="${imagen}" class="card-img-left" height="50%">
                        </div>
                        <div class="col-md-10" style="font-family: comic neue;">
                            <div class="card-body">
                                <h5 class="card-title">Nombre: ${nombre}</h5>
                                <p class="card-text">Conexiones: ${conexiones}</p>
                            </div>
                            <ul class="list-group list-group-flush">
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
                  `)

                }
            });
         } else {
            alert('Sólo se aceptan números')
        }; 

    });
});




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
