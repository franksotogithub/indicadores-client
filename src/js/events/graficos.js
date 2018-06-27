(function (service, utils) {
    $(document).ready(function (e) {


        self.categoria_select = 'P01';
          self.div_grag1 ='grafico_1_c1';
          self.div_grag2 ='grafico_2_c1';
        self.div_grag3 ='grafico_3_max_c1';
        self.div_grag4 ='grafico_4_max_c1';

        self.check_selected = [self.categoria_select];


        service.graficos.gePoblacionEdad('00' , utils.graficos.graf_persona_edad); //mostrara los graficos del ubigeo

        service.graficos.gePoblacionInd('00', utils.graficos.graf_barra_ubigeo);//mostrara los graficos de barra


        utils.graficos.crear_div_grafico();


        sliderGraph ();

    });

    $('#cmb_ubi').change(function () {
        var ubigeo = $('#cmb_ubi').val();
        service.graficos.gePoblacionEdad(ubigeo,  utils.graficos.graf_persona_edad); //mostrara los graficos del ubigeo
    });






    /*$('#cmb_ubi_m').change(function () {
        var ubigeo = $('#cmb_ubi_m').val();
        service.graficos.gePoblacionEdad(ubigeo, self.cant_select, self.div_grag1,self.div_grag2, utils.graficos.graf_persona_edad); //mostrara los graficos del ubigeo
    })

*/
})(App.service, App.utils);