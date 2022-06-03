let input_data;
let scatter_plot;
let bar_chart;
let filter = [];
let dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ];

d3.csv("https://NishimuraMasaya.github.io/InfoVis2022/W12/nhk_news_covid19_domestic_daily_data.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.infected_day = +d.infected_day;
            d.deaths_day = +d.deaths_day;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(["日", "月", "火", "水", "木", "金", "土" ]);

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'infected_day',
            ylabel: 'deaths_day',
            cscale: color_scale
        }, input_data );
        scatter_plot.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'day of the week',
            cscale: color_scale
        }, input_data );
        bar_chart.update();
    })
    .catch( error => {
        document.write( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.day ) );
    }
    scatter_plot.update();
}
