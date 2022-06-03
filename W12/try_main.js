d3.csv("https://NishimuraMasaya.github.io/InfoVis2022/W12/nhk_news_covid19_domestic_daily_data.csv")
    .then( data => {
        data.forEach( d => { d.infected_day = +d.infected_day; d.deaths_day = +d.deaths_day; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 512,
            margin: {top:30, right:10, bottom:50, left:50}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .range( [0 , self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [self.inner_height, 0] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(6)
            .tickSize(10);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(6)
            .tickSize(10);

        self.yaxis_group = self.chart.append('g')
            .attr('ransform', `translate(0, 0)`);
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.infected_day );
        const xmax = d3.max( self.data, d => d.infected_day );
        self.xscale.domain( [xmin-10, xmax+10] );

        const ymin = d3.min( self.data, d => d.deaths_day );
        const ymax = d3.max( self.data, d => d.deaths_day );
        self.yscale.domain( [ymin-10, ymax+10] );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.infected_day ) )
            .attr("cy", d => self.yscale( d.deaths_day ) )
            .attr("r", 1 );

        self.xaxis_group
            .call( self.xaxis )
            .append("text")
                .attr("fill", "red")
                .attr("x", (self.inner_width/2))
                .attr("y", 35)
                .attr("text-anchor", "middle")
                .attr("font-size", "12pt")
                .attr("font-weight", "middle")
                .text("X-label");

        self.yaxis_group
            .call( self.yaxis )
            .append("text")    
                .attr("fill", "red")
                .attr("x", -(self.inner_height/2))
                .attr("y", -35)
                .attr("transform", "rotate(-90)")
                .attr("text-anchor", "middle")
                .attr("font-size", "12pt")
                .attr("font-weight", "middle")
                .text("Y-label");

        self.svg
                .append("text")
                .attr("x", (self.config.width)/2)
                .attr("y", 20)
                .attr("font-size", "15pt")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .text("タイトル");
    }
}