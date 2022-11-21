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
           // console.log(stateData);
            //console.log(stateData[0]); //returns first obj
            //console.log(stateData[0].state); //returns NY
            // var nested = d3.nest()
            //     .key(function(d,i){ return d.state; })
            //     .entries(stateData);
            // console.log(nested);

            var newData = {"state": "root", "children": {}};
            
            stateData.forEach(function (d) {
                if (typeof newData.children[d.state] !== 'undefined') {
                    newData.children[d.state].children.push(d)
                } else {
                    newData.children[d.state] = {"state": d.state, "children": [d]}
                }
            })
            newData.children = Object.keys(newData.children).map(function(key) {
                    return newData.children[key];
            })
            console.log("newData:")
            console.log(newData);
            let hierarchy = d3.hierarchy(newData)
                    .sum(function(d){ return d.value})
                    .sort(
                        (node1, node2) => {
                            return node2['value'] - node1['value']
                        })
                console.log(hierarchy);
                    
            let createTreemap = d3.treemap() 
                    .size([1000,600])(hierarchy)
            
          console.log(createTreemap)
            let stateTiles = createTreemap.leaves()  
            console.log(stateTiles);        
                
        },
            error: function(xmlHttpRequest, textStatus, errorThrown) {
                alert("Error " + errorThrown);
            }
    });
}