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
            console.log(response);
            stateData = response;
            console.log(stateData);

            // obtain the state nest
            var state = {"key": "state", 
                "children":
                    d3.nest() //nest returns group by state
                        .key(function(d) {return d.state})
                        .entries(stateData)
                    }
                console.log(state);

            // obtain ny state nest
            var nystate    = state.children[0]
            console.log(nystate)

            //var nystateval = {"key":"value",
            //     "children":
            //        d3.nest()
            //            .key(function(d) {return d.nystateval.value})
            //    
            //    }
            //console.log(nystateval)

            let hierarchy = d3.hierarchy(nystate)
                    .sum(function(d){ return d.value})
                    //.sum(
                    //    (node) => {
                    //    return node['children']
                    //})
                    // .sort(
                    //     (node1, node2) => {
                    //         return node2['value'] - node1['value']
                    //     })
                console.log(hierarchy);
                    
            let createTreemap = d3.treemap() 
                    .size([1000,600])(hierarchy)
            
          // console.log(createTreemap)
            let stateTiles = createTreemap.leaves()  
            console.log(stateTiles);        
                
        },
            error: function(xmlHttpRequest, textStatus, errorThrown) {
                alert("Error " + errorThrown);
            }
    });
}