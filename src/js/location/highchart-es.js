/* Localizacion */
Highcharts.setOptions({
    lang: {
        contextButtonTitle: "Opciones del menú",
        decimalPoint: ".",
        downloadCSV: "Descargar CSV",
        downloadJPEG: "Descargar imagen JPEG",
        downloadPDF: "Descargar documento PDF",
        downloadPNG: "Descargar imagen PNG",
        downloadSVG: "Descargar vector SVG",
        downloadXLS: "Descargar Excel",
        drillUpText: "Regresar a {series.name}",
        invalidDate: undefined,
        loading: "Cargando...",
        months: [ "Enero" , "Febrero" , "Marzo" , "Abril" , "Mayo" , "Junio" , "Julio" , "Agosto" , "Septiembre" , "Octubre" , "Noviembre" , "Deciembre"],
        noData: "No hay dato para mostrar",
        numericSymbolMagnitude: 1000,
        numericSymbols: [ "k" , "M" , "G" , "T" , "P" , "E"],
        openInCloud: "Abrir en Highcharts Cloud",
        printChart: "Imprimir grafico",
        resetZoom: "Reiniciar zoom",
        resetZoomTitle: "Reiniciar zoom  nivel 1: 1",
        shortMonths: [ "Ene" , "Feb" , "Mar" , "Abr" , "May" , "Jun" , "Jul" , "Ago" , "Sep" , "Oct" , "Nov" , "Dic"],
        shortWeekdays: undefined,
        thousandsSep: "",
        viewData: "Ver dato en tabla,",
        weekdays: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],

        accessibility:{
            axis:{
                xAxisDescriptionPlural: "El grafico tiene {numAxes} ejes X mostrados {#each(names, -1), } y {names[-1]}",
                xAxisDescriptionSingular: "El grafico tiene 1 eje X mostrado {names[0]}.",
                yAxisDescriptionPlural: "El grafico tiene {numAxes} ejes Y mostrados {#each(names, -1), }and {names[-1]}",
                yAxisDescriptionSingular: "El grafico tiene 1 eje Y mostrados {names[0]}."
            },
            chartContainerLabel: "Grafico interactivo. {title}. Use las flechas hacia arriba y hacia abajo para navegar por la pantalla",
            chartHeading: "Grafico",
            chartTypes:{
                barMultiple: "Gráfico de barras con {numSeries} serie de datos",
                barSingle: "Gráfico de barras con {numPoints} {#plural(numPoints, bars, bar)}.",
                boxplotMultiple: "Diagrama de cajas {numSeries} serie de datos.",
                boxplotSingle: "Diagrama de caja {numPoints} {#plural(numPoints, boxes, box)}.",
                bubbleMultiple: "Grafico de burbujas con {numSeries} serie de datos.",
                bubbleSingle: "Grafico de burbujas con {numPoints} {#plural(numPoints, bubbles, bubble)}.",
                columnMultiple: "Gráfico de barras con {numSeries} serie de datos.",
                columnSingle: "Gráfico de barras con {numPoints} {#plural(numPoints, bars, bar)}.",
                combinationChart: "Combination chart con {numSeries} serie de datos.",
                defaultMultiple: "Gráfico con {numSeries} serie de datos.",
                defaultSingle: "Gráfico con {numPoints} datos {#plural(numPoints, points, point)}.",
                emptyChart: "Tabla vacia",
                lineMultiple: "Grafico de linea con {numSeries} lineas.",
                lineSingle: "Grafico de linea con {numPoints} dato {#plural(numPoints, points, point)}.",
                mapTypeDescription: "Map de {mapTitle} con {numSeries} serie de datos.",
                pieMultiple: "Grafico de torta con {numSeries} tortas.",
                pieSingle: "Grafico de torta con {numPoints} {#plural(numPoints, slices, slice)}.",
                scatterMultiple: "Grafico de disperción con {numSeries} serie de datos.",
                scatterSingle: "Gráfico de dispersión con {numPoints} {#plural(numPoints, points, point)}.",
                splineMultiple: "Grafico de linea con {numSeries} lineas.",
                splineSingle: "Grafico de linea con {numPoints} datos {#plural(numPoints, points, point)}.",
                unknownMap: "Mapa de región no especificada con {numSeries} serie de datos."
            },
            defaultChartTitle: "Grafico",
            exporting:{
                chartMenuLabel: "Exportar Grafico",
                exportRegionLabel: "Menu de exportación",
                menuButtonLabel: "Vista de menu de exportación"
            },
            legendItem: "Alternar la visibilidad de la serie {itemName}",
            longDescriptionHeading: "Descripcion larga.",
            mapZoomIn: "Acercar grafico",
            mapZoomOut: "Alejar grafico",
            navigationHint: "Usar regiones/puntos de referencia para adelantar para ver el gráfico {#plural(numSeries, and navigate between serie de datos,)}",
            noDescription: "No hay descripción disponible.",
            rangeSelectorButton: "Elegir rango {buttonText}",
            rangeSelectorMaxInput: "Elegir fecha final.",
            rangeSelectorMinInput: "Elegir fecha inicial.",
            screenReaderRegionLabel: "Información de renderizado de grafico",
            series:{
                description: "{description}",
                summary:{
                    bar: "{name}, Barra de series {ix} de {numSeries} con {numPoints} {#plural(numPoints, bars, bar)}.",
                    barCombination: "{name}, series {ix} de {numSeries}. Serie de barra con {numPoints} {#plural(numPoints, bars, bar)}.",
                    boxplot: "{name}, diagrama de cajas {ix} de {numSeries} con {numPoints} {#plural(numPoints, boxes, box)}.",
                    boxplotCombination: "{name}, series {ix} de {numSeries}. Diagrama de cajas con {numPoints} {#plural(numPoints, boxes, box)}.",
                    bubble: "{name}, bubble series {ix} de {numSeries} con {numPoints} {#plural(numPoints, bubbles, bubble)}.",
                    bubbleCombination: "{name}, series {ix} de {numSeries}. Bubble series con {numPoints} {#plural(numPoints, bubbles, bubble)}.",
                    column: "{name}, bar series {ix} de {numSeries} con {numPoints} {#plural(numPoints, bars, bar)}.",
                    columnCombination: "{name}, series {ix} de {numSeries}. Bar series con {numPoints} {#plural(numPoints, bars, bar)}.",
                    default: "{name}, series {ix} de {numSeries} con {numPoints} dato {#plural(numPoints, points, point)}.",
                    defaultCombination: "{name}, series {ix} de {numSeries} con {numPoints} dato {#plural(numPoints, points, point)}.",
                    line: "{name}, linea {ix} de {numSeries} con {numPoints} datoa {#plural(numPoints, points, point)}.",
                    lineCombination: "{name}, series {ix} de {numSeries}. Linea con {numPoints} dato {#plural(numPoints, points, point)}.",
                    map: "{name}, map {ix} de {numSeries} con {numPoints} {#plural(numPoints, areas, area)}.",
                    mapbubble: "{name}, bubble series {ix} de {numSeries} con {numPoints} {#plural(numPoints, bubbles, bubble)}.",
                    mapbubbleCombination: "{name}, series {ix} de {numSeries}. Bubble series con {numPoints} {#plural(numPoints, bubbles, bubble)}.",
                    mapCombination: "{name}, series {ix} de {numSeries}. Map con {numPoints} {#plural(numPoints, areas, area)}.",
                    mapline: "{name}, linea {ix} de {numSeries} con {numPoints} datos {#plural(numPoints, points, point)}.",
                    maplineCombination: "{name}, series {ix} de {numSeries}. Linea con {numPoints} dato {#plural(numPoints, points, point)}.",
                    pie: "{name}, torta {ix} de {numSeries} con {numPoints} {#plural(numPoints, slices, slice)}.",
                    pieCombination: "{name}, series {ix} de {numSeries}. Torta con {numPoints} {#plural(numPoints, slices, slice)}.",
                    scatter: "{name}, diagrama de dispersión con {ix} de {numSeries} con {numPoints} {#plural(numPoints, points, point)}.",
                    scatterCombination: "{name}, series {ix} de {numSeries}, scatter plot con {numPoints} {#plural(numPoints, points, point)}.",
                    spline: "{name}, linea {ix} de {numSeries} con {numPoints} datos {#plural(numPoints, points, point)}.",
                    splineCombination: "{name}, series {ix} de {numSeries}. Line con {numPoints} dato {#plural(numPoints, points, point)}."
                },
                xAxisDescription: "Eje X, {name}",
                yAxisDescription: "Eje Y, {name}"
            },
            seriesTypeDescriptions:{
                arearange: "Los cuadros de áreas son gráficos de líneas que muestran un rango entre un valor inferior y superior para cada punto.",
                areasplinerange: "Estos gráficos son gráficos de líneas que muestran un rango entre un valor inferior y superior para cada punto.",
                boxplot: "Los graficos de diagrama de caja se usan generalmente para mostrar grupos de datos estadísticos. Cada punto de datos en el gráfico puede tener hasta 5 valores: mínimo, cuartil inferior, mediana, cuartil superior y máximo.",
                bubble: "Los gráficos de burbujas son gráficos de dispersión donde cada punto de datos también tiene un valor de tamaño.",
                columnrange: "Los gráficos de rango de colores son gráficos de columnas que muestran un rango entre un valor inferior y superior para cada punto.",
                errorbar: "Las series Errorbar se usan para mostrar la variabilidad de los datos.",
                funnel: "Los gráficos de embudo se utilizan para mostrar la reducción de datos en etapas.",
                pyramid: "Los gráficos de pirámides constan de una sola pirámide con las alturas de los elementos correspondientes a cada valor de punto.",
                waterfall: "Un diagrama de cascada es un gráfico de columnas, donde cada columna contribuye a un valor final total."
            },
            structureHeading: "Estructura.",
            svgContainerTitle: "{chartTitle}",
            tableSummary: "Tabla de representacion del grafico.",
            viewAsDataTable: "Vista como tabla."
        }
    }
});