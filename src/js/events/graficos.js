(function (service, utils) {
    $(document).ready(function (e) {

        //utils.graficos.crearMinimizado([['15', 'LIMA'],['12', 'ayacucho'],['11', 'ICA'],['01', 'AMAZONAS']]);

        //utils.graficos.creargraficoComboUbi([['15', 'LIMA']]);


        //utils.graficos.graf_persona_edad([[752, 578],[228,316],[ 418, 325]]);
        //utils.graficos.graf_barra_ubigeo([ ['Lima', 515, 311, 216],['Callao', 154, 41, 66]]);

          self.div_grag1 ='grafico_1_c1';
          self.div_grag2 ='grafico_2_c1';


        self.div_grag1_c2 ='grafico_1_c2';
        self.div_grag1_c3 ='grafico_1_c3';
        self.div_grag1_c4 ='grafico_1_c4';
        self.div_grag1_c5 ='grafico_1_c5';
        self.div_grag1_c6 ='grafico_1_c6';



            service.graficos.gePoblacionEdad('00',0 ,'P01',self.div_grag1,self.div_grag2, utils.graficos.graf_persona_edad); //mostrara los graficos del ubigeo

        service.graficos.gePoblacionInd('00', 'P01', utils.graficos.graf_barra_ubigeo);//mostrara los graficos de barra


        utils.graficos.graf_educacion(self.div_grag1_c2);
        utils.graficos.graf_salud(self.div_grag1_c3);
        utils.graficos.graf_economia(self.div_grag1_c4);
        utils.graficos.graf_vivienda(self.div_grag1_c5);
        utils.graficos.graf_hogar(self.div_grag1_c6);



    });

    $('#cmb_ubi').change(function () {
        var ubigeo = $('#cmb_ubi').val();
        service.graficos.gePoblacionEdad(ubigeo, self.cant_select, 'P01',self.div_grag1,self.div_grag2, utils.graficos.graf_persona_edad); //mostrara los graficos del ubigeo
    })
    $('#cmb_ubi_m').change(function () {
        var ubigeo = $('#cmb_ubi_m').val();
        service.graficos.gePoblacionEdad(ubigeo, self.cant_select, 'P01',self.div_grag1,self.div_grag2, utils.graficos.graf_persona_edad); //mostrara los graficos del ubigeo
    })


})(App.service, App.utils);