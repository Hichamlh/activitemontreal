/*
 * Copyright 2017 Hicham Laroussi-Hassani.
 * Realisé dans le cadre du projet de session du cours INF4375
 * 
 */

$(document).ready(function () {
    var monTableau = $('#table_id').DataTable();

    $.ajax({
        type: 'GET',
        url: "/getNomInstallation",
        dataType: "json",
        success: function (data) {
            var listeBody = '<option value="Select"> Sélectionner une valeur ... </option>';
            $.each(data, function (i, item) {
                listeBody += '<option value="' + item + '">' + item + '</option>';
            });
            $("#listeInstallation").html(listeBody);
        },
        error: function (err) {
            alert('Erreur : ' + err.status);
        },
        failer: function () {
            alert(' Erreur !');
        }
    });

    $("#rechercherParArrondissement").click(function () {
        var arrondissement = $('#arrondissementInput').val();
        if (!arrondissement) {
            alert("Veuillez saisir un nom d'arrondissement");
        } else {
            $.ajax({
                type: "GET",
                url: "/installations",
                data: {arrondissement: arrondissement},
                dataType: "json",
                success: function (data) {
                    monTableau.destroy();
                    monTableau = $('#table_id').DataTable({
                        data: data,
                        "bAutoWidth": true,
                        columns: [
                            {data: 'typeInstallation'},
                            {data: 'nom'},
                            {data: 'arrondissement'},
                            {data: 'ouvert'},
                            {data: 'deblaye'},
                            {data: 'arrose'},
                            {data: 'resurface'},
                            {data: 'condition'},

                            {data: 'ID_UEV'},
                            {data: 'TYPE'},
                            {data: 'ADRESSE'},
                            {data: 'PROPRIETE'},
                            {data: 'GESTION'},
                            {data: 'POINT_X'},
                            {data: 'POINT_Y'},
                            {data: 'EQUIPEME'},
                            {data: 'LONG'},
                            {data: 'LAT'}
                        ]
                    });

                },

                error: function (err) {
                    alert("Erreur : " + err.status);
                },
                failer: function () {
                    alert('La demande de ressource a échoué !');
                }
            });
        }
    });

    $("#rechercherParInstallation").click(function () {
        var nom = $('#listeInstallation').val();
        if (nom !== "Select") {
            console.log("nom = " + nom);
            $.ajax({
                type: "GET",
                url: "/installationParNom/",
                data: {nom: nom},
                dataType: "json",
                success: function (data) {
                    var body = "";
                    if (!data) {
                        body = '<li class="list-group-item">Aucune donnée trouvée</li>';
                    } else {
                        body = '<li class="list-group-item"><b>Type : </b>' + data.typeInstallation + '</li>' +
                            '<li class="list-group-item"><b>Nom : </b>' + data.nom + '</li>' +
                            '<li class="list-group-item"><b>Arrondissement : </b>' + data.arrondissement + '</li>' +
                            '<li class="list-group-item"><b>Ouvert : </b>' + data.ouvert + '</li>' +
                            '<li class="list-group-item"><b>Deblaye : </b>' + data.deblaye + '</li>' +
                            '<li class="list-group-item"><b>Arrose : </b>' + data.arrose + '</li>' +
                            '<li class="list-group-item"><b>Resurface : </b>' + data.resurface + '</li>' +
                            '<li class="list-group-item"><b>Condition : </b>' + data.condition + '</li>' +
                            '<li class="list-group-item"><b>ID_UEV : </b>' + data.ID_UEV + '</li>' +
                            '<li class="list-group-item"><b>TYPE : </b>' + data.TYPE + '</li>' +
                            '<li class="list-group-item"><b>ADRESSE : </b>' + data.ADRESSE + '</li>' +
                            '<li class="list-group-item"><b>PROPRIETE : </b>' + data.PROPRIETE + '</li>' +
                            '<li class="list-group-item"><b>GESTION : </b>' + data.GESTION + '</li>' +
                            '<li class="list-group-item"><b>POINT_X : </b>' + data.POINT_X + '</li>' +
                            '<li class="list-group-item"><b>POINT_Y : </b>' + data.POINT_Y + '</li>' +
                            '<li class="list-group-item"><b>EQUIPEME : </b>' + data.EQUIPEME + '</li>' +
                            '<li class="list-group-item"><b>LONG : </b>' + data.LONG + '</li>' +
                            '<li class="list-group-item"><b>LAT : </b>' + data.LAT + '</li>';
                    }
                    $("#detail").html(body);
                },

                error: function (err) {
                    alert("Erreur : " + err.status);
                },
                failer: function () {
                    alert('La demande de ressource a échoué !');
                }
            });
        }
    });

});