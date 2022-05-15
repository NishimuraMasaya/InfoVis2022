d3.csv("https://NishimuraMasaya.github.io/InfoVis2022/W08/w08_task1.csv")
    .then( data => {
        data.forEach( d => {  d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:50, right:10, bottom:30, left:10}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        document.write( error );
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
            .attr('height', self.config.height + self.config.margin.top);
    
        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2 + self.config.margin.top})`);
    }

    update() {
        let self = this;

        self.render();
    }

    render() {
        let self = this;

        var radius = Math.min( self.config.width, self.config.height ) / 2;

        const pie = d3.pie()
            .value( d => d.value );

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        self.chart.selectAll('pie')
            .data( pie(self.data) )
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', 'black')
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

        self.svg
            .append("text")
            .attr("x", (self.config.width)/2)
            .attr("y", (self.config.margin.top)/2)
            .attr("font-size", "18pt")
            .attr("text-anchor", "middle")
            .attr("font-weight", 700)
            .text("Sample data");

    }
}