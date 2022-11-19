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