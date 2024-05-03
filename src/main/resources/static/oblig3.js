$(function () {
    hentAlleFilmer();
});

function hentAlleFilmer() {
    $.get("/hentFilmer", function (filmer) {
        formaterFilm(filmer);
    });
}

function formaterFilm(filmer) {
    let slct = "<select class='form-select' id='slctFilm'>";
    slct += "<option disabled selected>Velg en film</option>";
    for (const film of filmer) {
        slct += "<option value='" + film.film + "'>" + film.film + "</option>";
    }
    slct += "</select>";
    $("#film").html(slct);
}

function kjopBillett() {
    function sjekkValidasjon() {
        let validasjon = true;
        const regexNavn = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/; //regex
        const regexTelefon = /^\+?\d{8,}$/;
        const regexEpost = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if ($("#slctFilm").val() === "Velg en film") {
            $("#nullFilm").html("Du må velge en film");
            validasjon = false;
        }

        if (!/^\d+$/.test($("#inpAntall").val())) {
            $("#nullAntall").html("Du må skrive inn et gyldig antall");
            validasjon = false;
        }

        if (!regexNavn.test($("#inpFornavn").val())) {
            $("#nullFornavn").html("Du må skrive et gyldig fornavn");
            validasjon = false;
        }

        if (!regexNavn.test($("#inpEtternavn").val())) {
            $("#nullEtternavn").html("Du må skrive et gyldig etternavn");
            validasjon = false;
        }

        if (!regexTelefon.test($("#inpTelefonnr").val())) {
            $("#nullTelefonnr").html("Du må skrive et gyldig telefonnummer");
            validasjon = false;
        }

        if (!regexEpost.test($("#inpEpost").val())) {
            $("#nullEpost").html("Du må skrive inn en gyldig epost");
            validasjon = false;
        }

        return validasjon;
    }

    if (sjekkValidasjon()) {
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

function formaterData(billetter) {
    let ut = "<table class='table table-striped' id='tblFilmer'>";
    ut += "<tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>Epost</th><th>Handling</th></tr>";
    for (const billett of billetter) {
        ut += "<tr><td>" + billett.film + "</td>" +
            "<td>" + billett.antall + "</td>" +
            "<td>" + billett.fornavn + "</td>" +
            "<td>" + billett.etternavn + "</td>" +
            "<td>" + billett.tlfnr + "</td>" +
            "<td>" + billett.epost + "</td>" +
            "<td><button class='btn btn-danger' onclick='slettBillett(" + billett.id + ")'>Slett</button></td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#tabell").html(ut);
}

function hentAlle() {
    $.get("/hentAlle", function (data) {
        formaterData(data);
    })
}
function slettBillett(id) {
    $.ajax({
        url: '/slett/' + id,
        type: 'DELETE',
        success: function () {
            hentAlle();
        }
    });
}


function slettBilletter(){
    $.get("/slettAlle", function (){
        hentAlle();
    });
}



