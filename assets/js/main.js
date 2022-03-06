$.ajax({
    type: "get",
    url: "https://www.superheroapi.com/api.php/3525635500807579/1",
    dataType: "json",
    success: function (response) {
        console.log(response)
    }
});