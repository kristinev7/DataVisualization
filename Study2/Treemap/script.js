// var stateData=null;
// var state;
var data="";

$(document).ready(function () {
    $('#show').click(function () {
         data = $('#d:checked').val();
        if (data != undefined) {
            console.log(data);
            loadData(data);
        } else {
            alert("Please select data to show");
        }
    })
});

function loadData(data) {
    $("#canvas").empty();
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
            drawTreeMap(newData);
        },
            error: function(xmlHttpRequest, textStatus, errorThrown) {
                alert("Error " + errorThrown);
            }
    });
}

let drawTreeMap = (newData) => {
    let hierarchy = d3.hierarchy(newData)
                    .sum(function(d){ return d.value})
                    .sort(
                        (node1, node2) => {
                            return node2['value'] - node1['value']
                        })
                console.log(hierarchy);
                    
            let createTreemap = d3.treemap() 
                    .size([1000,600])
                    .paddingOuter(.5)(hierarchy)
            
            console.log(createTreemap) //yeh
            let stateTiles = createTreemap.leaves()  
            console.log(stateTiles);  
            
            let canvas = d3.select("#canvas");
            let info = d3.select("#info")
            let block = canvas.selectAll('g')
                .data(stateTiles)
                .enter()
                .append('g')
                .attr('transform', (Object) => {
                    return 'translate(' + Object['x0'] + ', ' + Object['y0'] + ')'
            })
            block.append('rect')
                .attr('class', 'tile')
                .attr('fill', (Object) => {
                    let category = Object['data']['state']
                    if(category === 'NY'){
                        return '#00FFFF'
                    }else if(category === 'CT'){
                        return '#9E999D';
                    }else if(category === 'NJ'){
                        return '#F2259C'
                    }else if(category === 'TN'){
                        return '#347EB4'
                    }else if(category === 'OH'){
                        return '#08ACB6'
                    }else if(category === 'KS'){
                        return '#91BB91'
                    }else if(category === 'CO'){
                        return '#BCD32F'
                    }else if(category === 'UT'){
                        return '#75EDB8'
                    }else if(category === 'AZ'){
                        return '#89EE4B'
                    }else if(category === 'NM'){
                        return '#AD4FE8'
                    }else if(category === 'NV'){
                        return '#D5AB61'
                    }else if(category === 'OR'){
                        return '#BC3B3A'
                    }else if(category === 'CA'){
                        return '#F6A1F9'
                    }else if(category === 'HI'){
                        return '#87ABBB'
                    }else if(category === 'FL'){
                        return '#412433'
                    }else if(category === 'TX'){
                        return '#56B870'
                    }else if(category === 'IN'){
                        return '#FDAB41'
                    }else if(category === 'MI'){
                        return '#64624F'
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
                        return '#c3e8de'
                    }
                    
                }).attr('data-name', (Object) => {
                    return Object['data']['state']
                }).attr('data-city', (Object) => {
                    return Object['data']['city']
                }).attr('data-value', (Object) => {
                    return Object['data']['value']
                }).attr('width', (Object) => {
                    return Object['x1'] - Object['x0']
                }).attr('height', (Object) => {
                    return Object['y1'] - Object['y0']
                }).on('mouseover', (Object) => {
                    info.transition()
                            .style('visibility', 'visible')
                    console.log(data);
                    let value = Object['data']['value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") //https://regex101.com/r/WldKAq/1

                    if (data === 'Total Wages') {
                        info.html(
                            'Total Wages: $' + value + '<br>' + Object['data']['city'] + 
                            ', \n' + Object['data']['state'] + '\n' + Object['data']['zipcode'] + '<hr/>'
                        )
                    } else {
                        info.html(
                             'Total Population: ' + value + '<br>'+ Object['data']['city'] + 
                             ', \n' + Object['data']['state'] + '\n' + Object['data']['zipcode'] + '<hr/>'
                        ) 
                    }
                    
                    info.attr('data-value', Object['data']['value'])
                }).on('mouseout', (Object) => {
                    info.transition()
                        .style('visibility', 'hidden')
                })
            
            block.append('text')
                .text((Object) => {
                    return Object['data']['state']
                })
                .attr('x', 5)
                .attr('y', 35)
                .style('font', "8px sans-serif")
            block.append('text')    
                .text((Object) => {
                    return Object['data']['city']
                })
                .style('font', "8px sans-serif")
                .attr('x', 1)
                .attr('y', 20)
                .style('font', "10px sans-serif");
            }






//sources: https://www.youtube.com/watch?v=wvfBn7GCCHk, https://observablehq.com/@d3/zoomable-treemap