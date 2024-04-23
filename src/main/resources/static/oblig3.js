$(function (){
    hentAlleFilmer();
});
function hentAlleFilmer(){
    $.get("hentFilmer", function (film){
        formaterFilm(film);
    });
}

function formaterFilm(film){
    let slct="<select class='form-select' id='slctFilm'>";
    for (const filmer of film){
        slct+= "<option>" + filmer.film + "</option>";
    }
    slct += "</select>";
    $("#film").html(slct);
}



function kjopBillett() {
    function sjekkValidasjon() {
        let validasjon = true;
        if ($("#slctFilm").val() === "Velg en film") {
            $("#nullFilm").html("Du må velge en film");
            validasjon = false;

        }
        if ($("#inpAntall").val() === "") {
            $("#nullAntall").html("Du må skrive inn et antall");
            validasjon = false;
        }

        if ($("#inpFornavn").val() === "") {
            $("#nullFornavn").html("Du må skrive et fornavn");
            validasjon = false;
        }

        if ($("#inpEtternavn").val() === "") {
            $("#nullEtternavn").html("Du må skrive et etternavn");
            validasjon = false;

        }

        if ($("#inpTelefonnr").val() === "") {
            $("#nullTelefonnr").html("Du må skrive et telefonnummer");

            validasjon = false;
        }


        else if (isNaN($("#inpTelefonnr").val())) {
            $("#nullTelefonnr").html("Du må skrive telefonnummer med tall");

            validasjon = false;

        }
        else {
            $("#nullTelefonnr").html("");
        }


        if ($("#inpEpost").val() === "") {
            $("#nullEpost").html("Du må skrive inn en epost");

            validasjon = false;
        }
        return validasjon;
    }

    if (sjekkValidasjon()==true) {
        const billett = {
            film: $("#slctFilm").val(),
            antall: $("#inpAntall").val(),
            fornavn: $("#inpFornavn").val(),
            etternavn: $("#inpEtternavn").val(),
            tlfnr: $("#inpTelefonnr").val(),
            epost: $("#inpEpost").val()
        };

        $.post("/lagre", billett, function () {
            hentAlle();
        });


        function hentAlle() {
            $.get("/hentAlle", function (data) {
                formaterData(data);
            })

        }

        function formaterData(billetter) {
            let ut = "<table class='table table-striped' id='tblFilmer'>";
            ut += "<tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>Epost</th></tr>";
            for (const billett of billetter) {
                ut += "<tr><td>" + billett.film + "</td><td>" + billett.antall + "</td><td>" + billett.fornavn + "</td><td>" + billett.etternavn + "</td><td>" + billett.tlfnr + "</td><td>" + billett.epost + "</td></tr>";
            }
            ut += "</table>";
            $("#tabell").html(ut);
        }

    }
    if ($("#slctFilm").val() !== "Velg en film") {
        $("#nullFilm").html("");
    }
    if ($("#inpAntall").val() >= 1) {
        $("#nullAntall").html("");
    }
    if ($("#inpFornavn").val() !== "") {
        $("#nullFornavn").html("");
    }
    if ($("#inpEtternavn").val() !== "") {
        $("#nullEtternavn").html("");
    }


    if ($("#inpEpost").val() !== "") {
        $("#nullEpost").html("");
    }




    $("#slctFilm").prop('selectedIndex',0);
    $("#inpAntall").val("");
    $("#inpFornavn").val("");
    $("#inpEtternavn").val("");
    $("#inpTelefonnr").val("");
    $("#inpEpost").val("");

}

function slettBillett(){

    function hentAlle() {
        $.get("hentAlle", function (data) {
            formaterData(data);
        })

    }

    function formaterData(billetter) {
        let ut = "<table class='table table-striped' id='tblFilmer'>";
        ut += "<tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>Epost</th></tr>";
        for (const billett of billetter) {
            ut += "<tr><td>" + billett.film + "</td><td>" + billett.antall + "</td><td>" + billett.fornavn + "</td><td>" + billett.etternavn + "</td><td>" + billett.tlfnr + "</td><td>" + billett.epost + "</td></tr>";
        }
        ut += "</table>";
        $("#tabell").html(ut);
    }
    $.get("/slettAlle", function (){
        hentAlle();
    });
}