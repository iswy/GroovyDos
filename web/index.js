var getEstados = function ()
{
    // TODO: recuperar eatados de la base de datos y almacenarlos en #selector
    // como se muestra en la función getEstadosT

};

var getLista = function ()
{
    // TODO: recuperar la relaciín ciudad:estado de la base de datos y
    // almacenarlos en el cuetpo de la tabla #tebody
    // como se muestra en la función getListaT
};

var getEstadosT = function ()
{
    var test = "Nayarit,Sinaloa,Durango,Zacatecas,Jalisco,Colima,Aguascalientez,Veracruz,Yucatán";

    var $sel = $( "#selector" );

    var textos = test.split( "," );

    for ( var i = 0; i < textos.length; i++ )
    {
        var $opt = $( "<option>" );
        $opt.text( textos[i] );

        $sel.append( $opt.clone() );
    }

};

var getListaT = function ()
{
    var test = "Tepic:Nayarit;";
    test += "Mazatlán:Sinaloa;";
    test += "Duracap:Durango;";
    test += "Zacatongo:Zacatecas;";
    test += "Guadalajara:Jalisco;";
    test += "Cola:Colima;";
    test += "Aguas:Aguascalientes";

    var $tabo = $( "#tebody" );

    var lista = test.split( ";" );

    for ( var i = 0; i < lista.length; i++ )
    {
        var dts = lista[i].split( ":" );

        var $tr = $( "<tr>" );

        var $ciudad = $( "<td>" );

        var $estado = $( "<td>" );

        $ciudad.text( dts[0] );
        $estado.text( dts[1] );

        $tr.append( $ciudad );
        $tr.append( $estado );

        $tabo.append( $tr );
    }
};

// esta función solo agrega una relación ciudad:estado
// a el cuerpo de la tabla #tebody
var agreTabla = function ( ciudad , estado )
{
    var $tr = $( "<tr>" );
    var $ciudad = $( "<td>" );
    var $estado = $( "<td>" );

    $ciudad.text( ciudad );
    $estado.text( estado );

    $tr.append( $ciudad );
    $tr.append( $estado );

    $( "#tebody" ).append( $tr );
};

// muestra mensajes, borra #ciudad & llama guardarbd
var guardar = function ()
{

    var s_ciudad = $( "#ciudad" ).val();
    var s_estado = $( "#selector" ).val();

    guardarbd( s_ciudad , s_estado );

    Materialize.toast( '¡Guardado ( ' + s_ciudad + " , " + s_estado + " ) !" , 4000 );

    agreTabla( s_ciudad , s_estado );

    $( "#ciudad" ).val( "" );
    $( "#but" ).addClass( "disabled" );
};

// TODO: guardar ciudad:estado en la base de datos
var guardarbd = function ( ciudad , estado )
{
    var uurrll = "NewCiudad";

    var estado_str = "" + estado;
    var ciudad_str = "" + ciudad;

    $.ajax(
        {
            url: uurrll , ////////// Url del servlet de guardar
            type: "post" ,
            data:
                {
                    idestado: estado_str ,
                    nombreciudad: ciudad_str
                }
        }
    ).done( function ( data )
    {
        console.log( "/" + uurrll + " ::: " );
        console.log( data );
        Materialize.toast( 'Recuperado BD' , 4000 );
        Materialize.toast( "" + data , 4000 );

    }
    ).fail( function ()
    {

    }
    );

};

var main = function ()
{
    getEstadosT();
    // getEstados();

    getListaT();
    // getLista();

    // getEstadosT() && getListaT() no usan la base de datos
    // cuando funcione la base de datos usar getEstados() && getLista()

    // presionar [enter] para guardar & no guardar #ciudad vacía
    $( '#ciudad' ).keyup( function ( e )
    {
        if ( e.which == 13 && $( this ).val( ).length != 0 )
        {
            guardar();
        }
        if ( $( this ).val( ).length != 0 )
        {
            $( "#but" ).removeClass( "disabled" );
        }
        else
        {
            $( "#but" ).addClass( "disabled" );
        }
    } );

    $( "#selector" ).material_select();

    // clic en botón
    $( "#but" ).on( "click" , function ( evt )
    {
        guardar();
    } );
};

$( document ).ready( main );