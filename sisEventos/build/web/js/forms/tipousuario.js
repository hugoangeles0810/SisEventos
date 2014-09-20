var frmModal;

$(document).ready(function(){
    $.ajaxSetup({
        cache: false
    });
    $(".linkBuscar").live('click', buscar );
    $("#savTipoUsuario").click( guardarTipoUsuario );
    $(".modTipoUsuario").live('click', seleccionarTipoUsuario );
    $(".delTipoUsuario").live('click', eliminarTipoUsuario );
    buscar();
});
//---------------------------------- Tipo de Usuario --------------
function buscar(){
//    var page = this.getAttribute("page");
    var txt = $("#txtBusqueda").val();
    $.getJSON(url_sistema[0], {
        opt: 2,
        localize: url_sistema[20]
    },
    function(data){
        $("#tblCategorias tbody>tr").remove();
        if(data!=null){
            $('#headTblCategorias').html(data.head);
            $('#footerTblCategorias').html(data.footer);
            datos = data.datos;
            if ( datos.length >0 ){
                for (var x = 0; x < datos.length; x += 1){
                    var id = datos[x].digit;
                    var nombre = datos[x].descripcion;
                    $("#tblCategorias tbody").append("<tr class='tResultado'><td><center>"+(x+1)+"</center></td><td>"+
                        nombre+"</td><td><center><a href='#' class='delTipoUsuario' id='"+id+"'>ELIMINAR</a> - "+
                        "<a href='#' class='modTipoUsuario' id='"+id+"' nombre='"+nombre+"'>MODIFICAR</a></center></td></tr>")
                }
            }else{
                jAlert('No Hay Registros');
            }
        }else{
            jAlert('No Hay Registros');
        }
    }
    );
}
function guardarTipoUsuario(){
    var modo = $("#savTipoUsuario").text();
    var ruta;
    if (modo=='MODIFICAR'){
        ruta = '3';
    }else{
        ruta = '4';
    }
    jConfirm('Desea guardar los cambios?', 'Confirmacion', function(r) {
        if(r==true){
            $.getJSON(url_sistema[0], {
                opt: ruta,
                localize: url_sistema[20],
                cod: $("#txtCodigo").val(),
                descrip: $("#txtNombre").val()
            },
            function(data){
                if (data.success==true){
                    $('#frmTipoUsuario').clearForm();
                    $("#linkBuscar0").click();
                    $("#savTipoUsuario").text("AGREGAR");
                    if (modo=='MODIFICAR'){
                        jAlert(mensaje_sistema[60]);
                    }else{
                        jAlert(mensaje_sistema[61]);
                    }
                }else{
                    jAlert(mensaje_sistema[100]);
                }
            }
            );
        }else{
            $('#frmTipoUsuario').clearForm();
            $("#linkBuscar0").click();
            $("#savTipoUsuario").text("AGREGAR");
        }
    });
}
function seleccionarTipoUsuario(){
    var id = this.getAttribute("id");
    var nombr = this.getAttribute("nombre");
    $('#txtCodigo').val(id);
    $('#txtNombre').val(nombr);
    $("#savTipoUsuario").text("MODIFICAR");    
}
function eliminarTipoUsuario(){
    var id = this.getAttribute("id");
    jConfirm(mensaje_sistema[159], 'Confirmacion', function(r) {
        if(r==true){
            $.getJSON(url_sistema[0], {
                opt: 5,
                localize: url_sistema[20],
                cod: id
            },
            function(data){
                if (data.success==true){
                    $('#frmTipoUsuario').clearForm();
                    $("#linkBuscar0").click();
                    jAlert(mensaje_sistema[56]);
                }else{
                    jAlert(mensaje_sistema[100]);
                }
            }
            );
        }
    });
}
$.fn.clearForm = function() {
    return this.each(function() {
        $(':input', this).each(function() {
            var type = this.type, tag = this.tagName.toLowerCase();
            if (type == 'text' || type == 'password' || tag == 'textarea')
                this.value = '';
            else if (type == 'checkbox' || type == 'radio')
                this.checked = false;
            else if (tag == 'select')
                this.selectedIndex = -1;
        });
    });
};