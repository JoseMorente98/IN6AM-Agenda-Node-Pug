var ViewModel = function () {
    var main = this;
    var categoriaUri = 'api/categoria/';
    main.categorias = ko.observableArray();
    var contactoUri = 'api/contacto/';
    main.contactos = ko.observableArray();
    main.error = ko.observable();
    main.categoriaDetalle = ko.observable();
    main.contactoDetalle = ko.observable();

    main.categoria = {
        idCategoria: ko.observable(),
        nombre: ko.observable()
    }

    main.contacto = {
        idContacto: ko.observable(),
        nombre: ko.observable(),
        apellido: ko.observable(),
        telefono: ko.observable(),
        correo: ko.observable(),
        idCategoria: ko.observable()
    }

    //Agregar
    main.agregar = function (forElement) {
        var categoria = {
            nombre: main.categoria.nombre()
        }
        ajaxHelper(categoriaUri, 'POST', categoria)
        .done(function (data) {
            $("#modalAgregarCategoria").modal('hide');
            main.getAllCategorias();
        });
    }

    //Agregar Contacto
    main.agregarContacto = function () {
        var contacto = {
            nombre: main.contacto.nombre(),
            apellido: main.contacto.apellido(),
            telefono: main.contacto.telefono(),
            correo: main.contacto.correo(),
            idCategoria: main.contacto.idCategoria().idCategoria
        }
        ajaxHelper(contactoUri, 'POST', contacto).done(function(data) {
            main.getAllContactos();
            $("#modalAgregarContacto").modal('hide');
        });
    }

    //Cargar
    main.cargar = function (item) {
        main.categoriaDetalle(item)
    }

    main.cargarContacto = function (item) {
        main.contactoDetalle(item)
    }

    //Editar
    main.editar = function (formElement) {
        var categoriaEditada = {
            idCategoria: main.categoriaDetalle().idCategoria,
            nombre: main.categoriaDetalle().nombre
        }
        var uriEditar = categoriaUri + categoriaEditada.idCategoria;
        ajaxHelper(uriEditar, 'PUT', categoriaEditada)
        .done(function (item) {
            $("#modalEditarCategoria").modal('hide');
            main.getAllCategorias();
        });
    }
    
    //Eliminar
    main.eliminar = function (item) {
        var idCategoria = item.idCategoria;
        var uriEliminar = categoriaUri + idCategoria;
        ajaxHelper(uriEliminar, 'DELETE').done(function (data) {
            main.getAllCategorias();
        });
    }

    main.eliminarContacto = function (item) {
        var idContacto = item.idContacto;
        var uriEliminar = contactoUri + idContacto;
        ajaxHelper(uriEliminar, 'DELETE').done(function (data) {
            main.getAllContactos();
        });
    }

    function ajaxHelper(uri, method, data) {
        //Limpiar Error
        //FUNCIONES CALLBACK funciones en cascada
        main.error('');
        return $.ajax({
            url: uri,
            type: method,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null //operador ternario
        }).fail(function (jqXHR, textStatus, errorThrown) {
            main.error(errorThrown)
        });
    }

    //Obtener todas las categorias
    main.getAllCategorias = function () {
        ajaxHelper(categoriaUri, 'GET')
            .done(function (data) {
                main.categorias(data);
            });
    }

    main.getAllContactos = function () {
        ajaxHelper(contactoUri, 'GET')
            .done(function (data) {
                main.contactos(data);
            });
    }

    main.getAllContactos();
    main.getAllCategorias();
}

$(document).ready(function () {
    var viewModel = new ViewModel();
    ko.applyBindings(viewModel);
});