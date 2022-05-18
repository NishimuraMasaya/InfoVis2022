d3.csv("https://NishimuraMasaya.github.io/InfoVis2022/W08/w08_task1.csv")
    .then( data => {
        data.forEach( d => {  d.x = +d.x; d.y = +d.y; d.r = +d.r; });

    })
    .catch( error => {
        document.write( error );
    });

let circles = svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle');

circles
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.r);

circles
    .on('mouseover', (e,d) => {
        d3.select('#tooltip')
            .style('opacity', 1)
            .html(`<div class="tooltip-label">Position</div>(${d.x}, ${d.y})`);
    })
    .on('mousemove', (e) => {
        const padding = 10;
        d3.select('#tooltip')
            .style('left', (e.pageX + padding) + 'px')
            .style('top', (e.pageY + padding) + 'px');
    })
    .on('mouseleave', () => {
        d3.select('#tooltip')
            .style('opacity', 0);
    });
