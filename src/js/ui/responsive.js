$(document).ready(function () {
    var altoVentana = $(window).height();
    $(document).on('click','.widget-NavegacionBar > button.botonNavegar', function() {
        var _this= $(this);
        var block = _this.attr('data-block');
        _this.addClass('active').siblings('button').removeClass('active');
        $('section.block[data-block='+block+']').show().siblings('section.block').hide();
    });

    $('section.block').css('height',(altoVentana-60)+'px');
});