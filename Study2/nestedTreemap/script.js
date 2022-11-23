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
            console.log(stateData);
            let data = d3.nest()
                .key(function (d) {return d.state;})
                // .key(function (d) {return d.city;})
                .object(stateData);
            console.log(data);
            drawTreeMap(data);
        },
            error: function(xmlHttpRequest, textStatus, errorThrown) {
                alert("Error " + errorThrown);
            }
    });
}

function drawTreeMap(data) {
    $('#canvas').empty();
    let hierarchy = d3.hierarchy(data)
        .sum(function(d) {return d.data})
        .sort( (node1, node2) => {
            return node2['value'] - node1['value']
        })
        console.log(hierarchy);
    let createTreemap = d3.treemap()
        .size([1000, 600])(hierarchy)
    console.log(createTreemap);
    let stateTiles = createTreemap.leaves();
    console.log(stateTiles);
}

