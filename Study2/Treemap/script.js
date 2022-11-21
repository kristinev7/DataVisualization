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
            
            console.log(createTreemap) //yeh
            let stateTiles = createTreemap.leaves()  
            console.log(stateTiles);  
            
            let canvas = d3.select("#canvas");
            
            let block = canvas.selectAll('g')
                .data(stateTiles)
                .enter()
                .append('g')

            block.append('rect')
                .attr('class', 'tile')
                .attr('fill', (stateTiles) => {
                    let category = stateTiles['data']['state']
                    if(category === 'NY'){
                        return 'orange'
                    }else if(category === 'CT'){
                        return 'lightgreen'
                    }else if(category === 'NJ'){
                        return 'crimson'
                    }else if(category === 'TN'){
                        return 'steelblue'
                    }else if(category === 'OH'){
                        return 'pink'
                    }else if(category === 'KS'){
                        return 'khaki'
                    }else if(category === 'CO'){
                        return 'tan'
                    }else if(category === 'UT'){
                        return 'lightgreen'
                    }else if(category === 'AZ'){
                        return 'crimson'
                    }else if(category === 'NM'){
                        return 'steelblue'
                    }else if(category === 'NV'){
                        return 'pink'
                    }else if(category === 'OR'){
                        return 'khaki'
                    }else if(category === 'CA'){
                        return 'tan'
                    }else if(category === 'HI'){
                        return 'lightgreen'
                    }else if(category === 'FL'){
                        return 'crimson'
                    }else if(category === 'TX'){
                        return 'steelblue'
                    }else if(category === 'IN'){
                        return 'pink'
                    }else if(category === 'MI'){
                        return 'khaki'
                    }else if(category === 'IL'){
                        return 'tan'
                    } else if(category === 'MO'){
                        return 'lightgreen'
                    }else if(category === 'MD'){
                        return 'crimson'
                    }else if(category === 'VA'){
                        return 'steelblue'
                    }else if(category === 'NC'){
                        return 'pink'
                    }else if(category === 'SC'){
                        return 'khaki'
                    }else if(category === 'GA'){
                        return 'tan'
                    }
                    
                }).attr('data-name', (stateTiles) => {
                    return stateTiles['data']['state']
                })
                .attr('data-city', (movie) => {
                    return stateTiles['data']['city']
                })
                .attr('data-value', (movie) => {
                    return stateTiles['data']['value']
                })
        },
            error: function(xmlHttpRequest, textStatus, errorThrown) {
                alert("Error " + errorThrown);
            }
    });
}