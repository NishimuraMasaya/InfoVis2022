let input_data;
let scatter_plot;
let bar_chart;
let filter = [];
let dayOfWeekStr = ["月", "火", "水", "木", "金", "土", "日"];
let count = 0;

d3.csv("https://NishimuraMasaya.github.io/InfoVis2022/W12/nhk_news_covid19_domestic_daily_data.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.infected_day = +d.infected_day;
            d.deaths_day = +d.deaths_day;
            d.day = dayOfWeekStr[count%7];
            count = count + 1;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(["月", "火", "水", "木", "金", "土", "日" ]);

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: '一日あたりの感染者数',
            ylabel: '一日あたりの死者数',
            cscale: color_scale
        }, input_data );
        scatter_plot.update();

        bar_chart = new BarChart( {
             parent: '#drawing_region_barchart',
             width: 256,
             height: 256,
             margin: {top:30, right:10, bottom:50, left:50},
             cscale: color_scale
         }, input_data );
        bar_chart.update();

        bar_chart2 = new BarChart2( {
            parent: '#drawing_region_barchart2',
            width: 256,
            height: 256,
            margin: {top:30, right:10, bottom:50, left:50},
            cscale: color_scale
        }, input_data );
       bar_chart2.update();
    })
    .catch( error => {
        document.write( error );
    });
