var dataforGraph;
var dataLength;
$(document).ready(function () {
    document.getElementById('upload').addEventListener('click', () => {
        fileValidation(); 
    });
    $('#submit').click (function (e) {
        e.preventDefault();
        $('.button').modal('hide');
        var uid = $('#uid').val();
        var pw = $('#pw').val();
        connectUser(uid, pw);   
    });
    $('#confirmLogout').click(function(e) {
        e.preventDefault();
        logout();
    });
    $('#line').click(function(e) {
        e.preventDefault();
        drawLine();
    });
    $('#bar').click(function(e) {
        e.preventDefault();
        drawBar();
    });
    $('#pie').click(function(e) {
        e.preventDefault();
        drawPie();
    });
})

//VERIFY UPLOAD DATA IS A CSV
function fileValidation() {
    var file = document.getElementById('csvFile');
    var filePath = file.value;
    //console.log("file value:", file.value);
    var allowedExtension = /(\.csv)$/i;
    if(!allowedExtension.exec(filePath)) {
        alert('The data is in wrong format. Only CSV file can be loaded!');
        return false;
    } else {
        parseData();
    }
};

//PARSE CSV FILE FOR TABLEVIEW
function parseData() {
    Papa.parse(document.getElementById('csvFile').files[0],
        {
            download: true,
            header: false,
            skipEmptyLines: true,
            complete: function(res) {
                //console.log(res.data);
                dataLength=Object.keys(res.data).length;
                //console.log(Object.keys(res.data).length);
                console.log(dataLength);
                var bbData=res.data;
                $('#messageArea').text("Length of Data: " + `${dataLength}`);
                //console.log(bbData);
                parseForGraph(bbData);
                drawTable(bbData);
            }
        });
}
//Parse file for graphview
function parseForGraph(){
    Papa.parse(document.getElementById('csvFile').files[0],
        {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(result) {
                //console.log(result.data);
                graphForData=result.data; 
                //console.log(graphForData);
            }
        });
}
//INFO FUNCTION
function giveInfo(){
    alert("Kristine Veneles, CPS4745, Project due Oct. 26, 2022");
}

//CLIENT INFO
function clientInfo() {
    let c = "";
    let jv="";
    let b = navigator.appCodeName;
    let version = navigator.appVersion;
    if(navigator.javaEnabled) {
        jv = "java is enabled";
    } else {
        jv="java is not enabled";
    }
    if(navigator.cookieEnabled) {
        c= "Cookie is enabled";
    } else {
        c= "Cooke is not enabled";
    }
    let txt = `${b}`+"\n"+ `${version}` +"\n"+ `${jv}`+"\n"+ `${c}`;
    alert(txt);
}

//LOGIN FUNCTION
function connectUser(uid,pw) {
    $.ajax({
        url:'login.php',
        type:'POST',
        data:{uid:uid, pw:pw},
        dataType:'text',
        async:false,
        success:function(response)
        {
            console.log(response);
            var msg = response;
            console.log('hello');

            $("#msgForUser").css("display", "block");
            $("#messageArea").text(msg);
        },
            error : function (xmlHttpRequest, textStatus, errorThrown) 
            {
                console.log(textStatus);
                console.log("Error " + errorThrown);
            }, 
            fail : function( jqXHR, textStatus ) {
                alert( "request failed: " + textStatus );
            }
        });
};

//GET USER INFO
function userInfo() {
    $.ajax({
        url: 'getInfo.php',
        type: 'POST',
        dataType: 'json',
        success:function(response)
        {
            console.log(response);
            var uid = response[0]['uid'];
            var login = response[0]['login'];
            var name = response[0]['name'];
            var gender = response[0]['gender'];
            if (uid == undefined || login==undefined || name == undefined || gender==undefined) {
                var r = response;
                alert(r);
            } else {
                viewUserInfo(uid, login, name, gender);
            } 
        },
        error : function (xmlHttpRequest, textStatus, errorThrown) 
        {
            console.log(textStatus);
            console.log("Error " + errorThrown);
        } 
    })
}

//User Info
function viewUserInfo(uid, login, name, gender) {
    let info = uid + ", " + login + ", " + name + ", " + gender;
    alert(info);
}

// LOGOUT FUNCTION
function logout() {
    $.ajax({
        url: 'logout.php',
        type: 'POST',
        dataType: 'text',
        success:function(response)
        {
            console.log(response);
            var msg = response;
            $("#msgForUser").css("display", "block");
            $("#messageArea").text(msg);
        }
    })
}

// EXIT_FUNCTION --DOESNOTWORK
function closeWindow() {
    if (confirm("Close Window?")) {
        window.open('','_parent','');
        window.close();
    }
}

//TABLE
function drawTable(csvData) {
    var data = new google.visualization.arrayToDataTable(csvData);
    var options = {
        width: '1000px',
    };
    //getValue(rowIndex, columnIndex
    //console.log(data.getValue(0, 0));
    //console.log(data.getValue(0, 1));
    var table = new google.visualization.Table(document.getElementById('chart'));
    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}

//check if bbData is empty
function checkData(data) {
    return(data ? 'true': 'false');
}
//avg line graph
function avgLineGraph(ddata) {
    //var d = new google.visualization.arrayToDataTable(csvData);
    var d=ddata;
    //console.log(d);
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Ballpark');
    data.addColumn('number',  'Distance');
    $.each(d, function(i, d) {
        var park = d.Ballpark;
        //console.log(park);
        var distance = parseInt(d.Distance);
        //console.log(distance);
        data.addRows([[park, distance]]);
    });

    var newData = google.visualization.data.group(data, [{
        column: 0,
        label: 'Ballpark',
        type:'string'  
    }], [{
        column: 1,
        label: 'Avg Distance',
        aggregation: google.visualization.data.avg,
        type: 'number'
    }]);
    var options = {
        width: 1270,
        height: 500,
        axes: {
            x: {
                0: {side: 'top'}
            }
        },
        hAxis:{
            slantedText: true,
            slantedTextAngle: 90
        }
    };
    // var table = new google.visualization.LineChart(document.getElementById('chart_div'));
    var table = new google.charts.Line(document.getElementById('displayGraph'));
    table.draw(newData, options);
    //google.charts.Line.convertOptions(options)
}
//est line graph
function estLineGraph(ddata) {
    var d = ddata;
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Exit_Velocity');
    data.addColumn('number', 'Elevation_Angle');
    $.each(d, function(i, d) {
        var ev = parseFloat(d.Exit_Velocity);
        var ea = parseFloat(d.Elevation_Angle);
        data.addRows([[ev, ea]]);
    });
    var newData = google.visualization.data.group(data, 
        [{
            
            column: 0,
            label: 'Exit_Velocity',
            type: 'number'
            
        }],
        [{
            column: 1,
            label: 'Elevation_Angle',
            aggregation: google.visualization.data.avg,
            type: 'number'
        }]
      );
        var options = {
            width: 1270,
            height: 500,
        };
        var table = new google.charts.Line(document.getElementById('displayGraph'));
        table.draw(newData, google.charts.Line.convertOptions(options));
}
//avg bar graph
function avgBarGraph(ddata) {
    var d = ddata;
    //console.log(d);
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Ballpark');
    data.addColumn('number',  'Distance');
    $.each(d, function(i, d) {
        var park = d.Ballpark;
        //console.log(park);
        var distance = parseInt(d.Distance);
        //console.log(distance);
        data.addRows([[park, distance]]);
    });
    var newData = google.visualization.data.group (data, [{
        column: 0,
        label: 'Ballpark',
        type: 'string'
    }],
     [{
        column: 1, 
        label: 'Avg Distance',
        aggregation: google.visualization.data.avg,
        type: 'number'
    }]
    );
    var options = {
        bars: 'horizontal',
        height: 500,
        width: 1270
    };
    var table = new google.charts.Bar(document.getElementById('displayGraph'));
    table.draw(newData, options);
}
//est bar graph
function estBarGraph(ddata) {
    var d = ddata;
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Exit_Velocity');
    data.addColumn('number', 'Distance');
    $.each(d, function(i, d) {
        var exit_vel = parseFloat(d.Exit_Velocity);
        var hor_ang = parseInt(d.Distance);
        data.addRows([[exit_vel, hor_ang]]);
    })
    var newData = google.visualization.data.group(data, 
        [{
            column: 0,
            label: 'Avg Exit Velocity',
            aggregation: google.visualization.data.avg,
            type: 'number'
        }],
        [{
            column:1,
            label: 'Avg Distance',
            aggregation: google.visualization.data.avg,
            type: 'number'  
        }],
    );
        var options = {
            // bars: 'horizontal',
            hAxis: {format: 'decimal'},
            height: 500,
            colors: ['#1b9e77', '#d95f02', '#7570b3']
        };
        var table = new google.charts.Bar(document.getElementById('displayGraph'));
        table.draw(newData, options);
}
//bar graph
function drawBar() {
    var graphD = $('#dataToGraph:checked').val();
    // console.log(checkData(graphForData));
    if (checkData(graphForData) === 'true') {
        if ( graphD === 'avgDist') {
            avgBarGraph(graphForData);
            $('#messageArea').text("Length of Data: " + `${dataLength}`);
        } else if (graphD === 'estEV') {
            estBarGraph(graphForData);
            $('#messageArea').text("Length of Data: " + `${dataLength}`);
        } else {
            var notice = "Please choose pie or line graph for data."
            $('#graphArea').text(notice);
            $('#messageArea').text(notice);
        }
    } else {
        $('#messageArea').text("Please load data.")
        $('#graphArea').text("Please load data.")
    }
}
//line
function drawLine() {
    var graphD = $('#dataToGraph:checked').val();
// console.log(bbData);
// console.log(checkData(bbData));
    if (checkData(graphForData) === 'true') {
        if (graphD === 'avgDist')  {
            avgLineGraph(graphForData);
            $('#messageArea').text("Length of Data: " + `${dataLength}`);
        } else if (graphD == 'estEV') {
            estLineGraph(graphForData);
            $('#messageArea').text("Length of Data: " + `${dataLength}`);
        }else {
            var notice = "Please choose pie or bar graph for data."
            $('#graphArea').text(notice);
            $('#messageArea').text(notice);
        }
    } else {
        $('#messageArea').text("Please load data.")
        $('#graphArea').text("Please load data.")
    }
}
//Pie
function drawPie() {
    var graphD = $('#dataToGraph:checked').val();
    if (checkData(graphForData) === 'true') {
        if (graphD === 'homeR')  {
            pieGraph(graphForData);
            $('#messageArea').text("Length of Data: " + `${dataLength}`);
        } else {
            var notice = "Please choose line or bar graph for data."
            $('#graphArea').text(notice);
            $('#messageArea').text(notice);
        }
    } else {
        $('#messageArea').text("Please load data.")
        $('#graphArea').text("Please load data.")
    }
}
//pie graph
function pieGraph(ddata){
    var d = ddata;
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Ballpark');
    data.addColumn('number', 'Record_ID');
    $.each(d, function(i, d) {
        var park = d.Ballpark;
        var id = parseInt(d.Record_ID);
        data.addRows([[park, id]]);
    })
    var newData = google.visualization.data.group(data, 
    [{
        column:0,
        label: 'Ballpark',
        type:'string'

    }],
    [{
        column: 1,
        label: 'Number of Record_ID',
        aggregation: google.visualization.data.count,
        type: 'number'
    }]
    );
    var options = {
        title: 'Total Home Runs In Every Park'
    };
    var table = new google.visualization.PieChart(document.getElementById('displayGraph'));
    table.draw(newData, options);
}



















// https://www.valentinog.com/blog/html-table/