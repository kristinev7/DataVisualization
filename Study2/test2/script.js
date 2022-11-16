var stateData=null;
var state;

$(document).ready(function () {
    $('#show').click(function () {
        var data = $('#d:checked').val();
        if (data != undefined) {
            console.log(data);
            loadData(data);
        } else {
            alert("Please select data to show");
        }
    })
});

function loadData(data) {
    $.ajax({
        url: 'fetch.php',
        type: 'GET',
        data: {data:data},
        dataType: 'json',
        success: function(response)
        {
            //console.log(response);
            stateData = response;
            //console.log(stateData);
             var state = d3.nest()
                .key(function(d) {return d.state})
                .entries(stateData);
                console.log(state);
                
        },
            error: function(xmlHttpRequest, textStatus, errorThrown) {
                alert("Error " + errorThrown);
            }
    });
}

var height = 600;
var width = 1000;
format = d3.format(",d");
const x = d3.scaleLinear().rangeRound([0, width]);
const y = d3.scaleLinear().rangeRound([0, height]);

function drawTreeMap(data) {
    const svg = d3.select("#canvas")
        .attr("viewBox", [0.5, -30.5, width, height + 30])
        .style("font", "10px sans-serif");

    let group = svg.append("g")
        .call(render, treemap(data));
    
    function render(group, root) {
        const node = group
        .selectAll("g")
        .data(root.children.concat(root))
        .join("g");

        node.filter(d=> d===root ? d.parent : d.children)
        .attr("cursor", "pointer")
        .on("click", (event, d) => d === root ? zoomout(root) : zooomin(d));

        let name = d => d.ancestors().reverse().map(d => d.data.state).join("/");
        node.append("title")
            .text(d => `${name(d)}\n${format(d.values)}`);

        node.append("rect")
            .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
            .attr("fill", d => d === root ? "#fff" : d.children ? "#ccc" : "#ddd")
            .attr("stroke", "#fff");
        
        node.append("clipPath")
            .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
            .append("use")
            .attr("xlink:href", d => d.leafUid.href);
        
        
    }
}



treemap = state => d3.treemap()
    .tile(tile)
  (d3.hierarchy(state)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))

function tile(node, x0, y0, x1, y1) {
    d3.treemapBinary(node, 0, 0, width, height);
    for (const child of node.children) {
        child.x0 = x0 + child.x0 / width * (x1 - x0);
        child.x1 = x0 + child.x1 / width * (x1 - x0);
        child.y0 = y0 + child.y0 / height * (y1 - y0);
        child.y1 = y0 + child.y1 / height * (y1 - y0);
    }
}