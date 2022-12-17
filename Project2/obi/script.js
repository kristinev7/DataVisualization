var dataForGraph=null;
var dataLength;
var dataP2 = null;
var id; //id number
var login; //login name
var uid; //login from login form
var avgWage;//average of avgwage from db
var estPop;//avg of est pop from db
var minAvg;//should get from db
var maxAvg;//should get from db
var minEst;//should get from db
var maxEst;//should get from db
var avgValue;//current avg wage from slider
var estValue;//current populaton from slider
var plot1;//user's chart 1 pref
var plot2;//user's chart 2 pref
var preferences;//user's preferences
var subject;//subject to email
//console.log(uid);
$(document).ready(function () {
    window.onload = function() {
        var iframe = document.getElementById('info');
        iframe.style.display = 'none';
    }
    document.getElementById('upload').addEventListener('click', () => {
        fileValidation(); 
    });
    $('#submit').click (function (e) {
        e.preventDefault();
        $('.button').modal('hide');
         uid = $('#uid').val();
        // console.log(uid);
        var pw = $('#pw').val();
        connectUser(uid, pw);   
    });
    $('#confirmLogout').click(function(e) {
        e.preventDefault();
        logout();
    });
    $('#exit').click(function() {
        hideInfo();
    })
    const p2 = document.getElementById('p2');
    document.getElementById('data1').addEventListener('click', (e) => {
        e.preventDefault();
        getAvg1();//getting min/maxwage,min/maxpop,avgwage/pop
    });
    document.getElementById('d2').addEventListener('click', () => {
        getAvg2();//getting min/maxwage,min/maxpop,avgwage/pop
    });
    document.getElementById('avgRange').addEventListener('click', () => {
        pullData();//to get current value to updatecharts
    });
    document.getElementById('estRange').addEventListener('click', () => {
        pullData();//get current value to update charts
    });
    document.getElementById('save').addEventListener('click', () => {
        saveSetting();//save to database
    })
    $('#save').click(function(e) {
        e.preventDefault();
        saveSetting();
    })
    $('#mail').click(function(e) {
        e.preventDefault();
        mailTo();
    })
    $('#sendMail').click(function(e) {
        e.preventDefault();
        sendMail();
    })
    
})
//update and fetch Wage and Population data
function updateData() {
    $.ajax({
        url: 'fetchData.php', 
        type: 'POST',
        data: {minAvg:minAvg, avgValue:avgValue, minEst:minEst, estValue:estValue},
        dataType: 'json',
        success: function(response)
        {
            console.log(response);
            var msg;
            if (!Array.isArray(response)) {
                msg = response;
                $("#msgForUser").css("display", "block");
                $("#messageArea").text(msg);
                $("#displayGraph").text(msg);
                $("#chart").text(msg);
            } else {
                dataP2 = response;
                console.log(dataP2);
                drawData1(dataP2);
                showP2();               
            } 
            
        }

    })

}
//send email of preferences
function sendMail() {
    let recipient = document.getElementById('Recipient').value;
    console.log(recipient);
    console.log(subject);
    console.log(preferences);
    $.ajax({
        url: 'mail.php',
        type: 'POST',
        data: {recipient:recipient, subject:subject, preferences},
        dataType: 'text',
        success:function(response)
        {
            console.log(response);
						if ( response === 'true' ){
							$("#messageArea").text("Mail Sent");
						}
        }
    })
}
//mail preferences
function mailTo() {
    subject = login + "'s Preferences";
    preferences = estValue + ", " + avgValue + ", " + plot1 + ", " + plot2; 
    //console.log(preferences);
}
//show p2 menu choice
function showP2() {
    if ( uid !== undefined) {
        if (document.getElementById('data1').click) {
            p2.style.display = 'inline-block';
        } 
    } else 
     {
        p2.style.display = 'none';
    } 
    // getAvg1();
}
// load DB data1
function data1() {
    $.ajax({
        url: 'getData1.php',
        type: 'POST',
        dataType: 'json',
        success: function(response)
        {
            //console.log("data1: ", response);
            var msg;
            if (!Array.isArray(response)) {
                msg = response;
                $("#msgForUser").css("display", "block");
                $("#messageArea").text(msg);
                $("#displayGraph").text(msg);
                $("#chart").text(msg);
            } else {
                dataP2 = response;
                //console.log(dataP2);
                drawData1(dataP2);
                showP2();//showsmenuforcharts
            }       
        }
    })
}
//getAverages
function getAvg1() {
    $.ajax({
        url: 'getAverages.php',
        type: 'POST',
        dataType: 'json',
        success: function(response)
        {
            //console.log("data1: ", response);
            var msg;
            if (!Array.isArray(response)) {
                msg = response;
                $("#msgForUser").css("display", "block");
                $("#messageArea").text(msg);
                $("#displayGraph").text(msg);
                $("#chart").text(msg);
            } else {
                var dv1 = response;
                avgWage = dv1[0]['avgW'];
                estPop = dv1[0]['avgE'];
                minAvg = dv1[0]['minW'];
                maxAvg = dv1[0]['maxW'];
                minEst = dv1[0]['minP'];
                maxEst = dv1[0]['maxP'];
                //send information to slider
                document.getElementById("avgRange").min = minAvg;
                document.getElementById("avgRange").max = maxAvg;
                document.getElementById("estRange").min = minEst; 
                document.getElementById("estRange").max = maxEst;
            }       
        } 
    })
}
// load DB data2
function data2() {
    $.ajax({
        url: 'getData2.php',
        type: 'POST',
        dataType: 'json',
        success: function(response)
        {
            console.log("data2: ", response);
            var msg;
            if (!Array.isArray(response)) {
                msg = response;
                $("#msgForUser").css("display", "block");
                $("#messageArea").text(msg);
                $("#displayGraph").text(msg);
                $("#chart").text(msg);
            } else {
                dataP2 = response;
                console.log(dataP2);
                drawData1(dataP2);
                showP2();               
            } 
        } 
    })
}
//getAvg2 for vDV_Data2
function getAvg2() {
    $.ajax({
        url: 'getAvg2.php',
        type: 'POST',
        dataType: 'json',
        success: function(response)
        {
            //console.log("data1: ", response);
            var msg;
            if (!Array.isArray(response)) {
                msg = response;
                $("#msgForUser").css("display", "block");
                $("#messageArea").text(msg);
                $("#displayGraph").text(msg);
                $("#chart").text(msg);
            } else {
                var dv2 = response;
                avgWage = dv2[0]['avgW'];
                estPop = dv2[0]['avgE'];
                minAvg = dv2[0]['minW'];
                maxAvg = dv2[0]['maxW'];
                minEst = dv2[0]['minP'];
                maxEst = dv2[0]['maxP'];
                //send information to slider
                document.getElementById("avgRange").min = minAvg;
                document.getElementById("avgRange").max = maxAvg;
                document.getElementById("estRange").min = minEst; 
                document.getElementById("estRange").max = maxEst
            }       
        }
    })
} 
//show info in an iframe
function displayInfo() {
        var iframe = document.getElementById('info');
        iframe.style.display= 'block';
}
//hide info in iframe
function hideInfo() {
    var iframe = document.getElementById('info');
    iframe.style.display= 'none';
}
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
                console.log(bbData);
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
                dataForGraph=result.data; 
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
            //console.log(response);
            var msg = response;
            $("#msgForUser").css("display", "block");
            $("#messageArea").text(msg);
            $("#displayGraph").text(msg);
			$("#dGraph2").text(msg);
            $("#chart").text(msg);
            userInfo();
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
             id = response[0]['uid'];
             login = response[0]['login'];
             console.log(uid);
             console.log(login);
            var name = response[0]['name'];
            var gender = response[0]['gender'];
            if (id == undefined || login==undefined || name == undefined || gender==undefined) {
                var r = response;
                alert(r);
            } else {
                viewUserInfo(id, login, name, gender);
            } 
        }
    })
}
//User Info
function viewUserInfo(uid, login, name, gender) {
    let info = uid + ", " + login + ", " + name + ", " + gender;
    console.log('uid: ', id);
    console.log('login: ', login);
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
            uid = undefined;
            var msg = response;
            $("#msgForUser").css("display", "block");
            $("#messageArea").text(msg);
            $("#displayGraph").text(msg);
            $("#dGraph2").text(msg);
            $("#chart").text(msg);
            showP2();
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
    console.log("data: ", data);
    var options = {
        width: '1000px',
    };
    //getValue(rowIndex, columnIndex
    //console.log(data.getValue(0, 0));
    //console.log(data.getValue(0, 1));
    var table = new google.visualization.Table(document.getElementById('chart'));
    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}
//check if graphForData is empty
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
        width: '1000px',
        height: 500,
        hAxis:{
            textPosition:'out',
            slantedText: true,
            slantedTextAngle: -45
        }
    };
    // var table = new google.visualization.LineChart(document.getElementById('chart_div'));
    var table = new google.visualization.LineChart(document.getElementById('displayGraph'));
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
            width: '1000px',
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
    data.addColumn('number',  'Apex');
    $.each(d, function(i, d) {
        var park = d.Ballpark;
        //console.log(park);
        var distance = parseInt(d.Apex);
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
        label: 'Avg Apex',
        aggregation: google.visualization.data.avg,
        type: 'number'
    }]
    );
    var options = {
        bars: 'horizontal',
        height: 500,
        width: '1000px'
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
            width: '1000px',
            colors: ['#1b9e77', '#d95f02', '#7570b3']
        };
        var table = new google.charts.Bar(document.getElementById('displayGraph'));
        table.draw(newData, options);
}
//HR bar
function hrBarGraph(ddata){
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
        column: 0,
        label: 'Ballpark',
        type: 'string'
    }],
    [{
        column: 1,
        label: 'Number of Record_ID',
        aggregation: google.visualization.data.count,
        type: 'number'
    }]);
    var options = {
        title: 'Total Home Runs In Every Park',
        width: '1000px'
    };
    var table = new google.visualization.BarChart(document.getElementById('displayGraph'));
    table.draw(newData, options);
}
//bar graph
function drawBar() {
    var graphD = $('#dataToGraph:checked').val();
    // console.log(checkData(graphForData));
    if (checkData(dataForGraph) === 'true') {
        if ( graphD === 'avgDist') {
            avgBarGraph(dataForGraph);
            $('#messageArea').text("Length of Data: " + `${dataLength}`);
        } else if (graphD === 'estEV') {
            estBarGraph(dataForGraph);
            $('#messageArea').text("Length of Data: " + `${dataLength}`);
        } else if(graphD === 'homeR') {
            hrBarGraph(dataForGraph);
            $('#messageArea').text("Length of Data: " + `${dataLength}`);
        } else {
            var notice = "Please choose appropriate graph for data."
            $('#displayGraph').text(notice);
            $('#messageArea').text(notice);
        }
    } else if(dataForGraph === null){
        $('#messageArea').text("Please load data.")
        $('#displayGraph').text("Please load data.")
    }
}
//line
function drawLine() {
    var gD = $('#dataToGraph:checked').val();
// console.log(bbData);
    console.log(checkData(dataForGraph));
    if (checkData(dataForGraph) === 'true') {
        if (graphD === 'avgDist')  {
            avgLineGraph(dataForGraph);
            $('#messageArea').text("Length of Data: " + `${dataLength}`);
        } else if (graphD == 'estEV') {
            estLineGraph(dataForGraph);
            $('#messageArea').text("Length of Data: " + `${dataLength}`);
        } else if (graphD === 'homeR') {
            var notice = "Please choose appropriate graph for data."
            $('#displayGraph').text(notice);
            $('#messageArea').text(notice);
        } else {
            var notice = "Please choose appropriate graph for data."
            $('#gdisplayGraph').text(notice);
            $('#messageArea').text(notice);
        }
    } else {
        $('#messageArea').text("Please load data.")
        $('#displayGraph').text("Please load data.")
    }
}
//Pie
function drawPie() {
    var graphD = $('#dataToGraph:checked').val();
    if (checkData(dataForGraph) === 'true') {
        if (graphD === 'homeR')  {
            pieGraph(dataForGraph);
            $('#messageArea').text("Length of Data: " + `${dataLength}`);
        } else {
            var notice = "Please choose appropriate graph for data."
            $('#displayGraph').text(notice);
            $('#messageArea').text(notice);
        }
    } else {
        $('#messageArea').text("Please load data.")
        $('#displayGraph').text("Please load data.")
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
        title: 'Total Home Runs In Every Park',
        width: '1000px'
    };
    var table = new google.visualization.PieChart(document.getElementById('displayGraph'));
    table.draw(newData, options);
}
//display table for Data1 and Data2
function drawData1(d) {
    var d = d;
    var dataVis = new google.visualization.DataTable(d);
    dataVis.addColumn('number', 'RecordNumber');
    dataVis.addColumn('number', 'Zipcode');
    dataVis.addColumn('string', 'City');
    dataVis.addColumn('string', 'State');
    dataVis.addColumn('number', 'EstimatedPopulation');
    dataVis.addColumn('number', 'TotalWages');
    dataVis.addColumn('number', 'AvgWages');
    $.each(d, function(i, d) {
        var rn = parseInt(d.RecordNumber);
        var z = parseInt(d.Zipcode);
        var c = d.City;
        var s = d.State;
        var ep = parseInt(d.EstimatedPopulation);
        var tw = parseFloat(d.TotalWages);
        var aw = parseFloat(d.AvgWages);
        dataVis.addRows([[rn, z, c, s, ep, tw, aw]])
    });
    
    var avgL = google.visualization.data.group(dataVis, [{
        column: 0,
        label: 'Number of Wages',
        type:'number'  
    }], [{
        column: 1,
        label: 'Average Wages',
        aggregation: google.visualization.data.avg,
        type: 'number'
    }]);
    console.log(dataVis);
    //console.log(avgL);
    var table = new google.visualization.Table(document.getElementById('chart'));
    // var formatter = new google.visualization.ColorFormat();
    // formatter.addRange(-2000, 0, 'black', 'red');
    // formatter.addRange(2000, null, 'black', 'green');
    // formatter.format(dataVis, 5);
    table.draw(dataVis, {allowHTML: true, showRowNumber: true, width: '100%', height: '100%'});
}
//display charts for Data1 or Data2
function displayCharts(d) {
    var gD = $('#data2:checked').val();
    console.log(checkData(dataP2));
    if (checkData(dataP2) === 'true') {
        if (gD === 'avg')  {
            // console.log(dataP2);
           avgData(dataP2);
            //$('#messageArea').text("Length of Data: " + `${dataLength}`);
        } else if (gD == 'est') {
            // console.log(dataP2);
            estData(dataP2);
            // estBar(dataP2);
            //$('#messageArea').text("Length of Data: " + `${dataLength}`);
        } else if (gD === 'count') {
            // console.log(dataP2);
            cData(dataP2);
            // cPie(dataP2);
           // $('#displayGraph').text(notice);
            //$('#messageArea').text(notice);
            // } else {
            //     var notice = "Please choose appropriate graph for data."
            //     $('#gdisplayGraph').text(notice);
            //     $('#messageArea').text(notice);
        }
    } else {
        $('#messageArea').text("Please load data.")
        $('#displayGraph').text("Please load data.")
    }
}
//display avgData charts
function avgData(dP2) {
    var d = dP2;
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'State');
    data.addColumn('number',  'AvgWages');
    $.each(d, function(i, d) {
        var c = d.State;
        var tw = parseInt(d.TotalWages);
        data.addRows([[c, tw]]);
    });
    var avgD = google.visualization.data.group(data, [{
        column: 0,
        label: 'State',
        type:'string'  
    }], [{
        column: 1,
        label: 'Avg Wages',
        aggregation: google.visualization.data.avg,
        type: 'number'
    }]);
    var line_options = {
        width: '100%',
        height: '100%',
        hAxis:{
            textPosition:'out',
            slantedText: true,
            slantedTextAngle: -90
        }
    };
    var bar_options = {
        bars: 'horizontal',
        height: '100%',
        width: '100%'
    }
    var table = new google.visualization.LineChart(document.getElementById('displayGraph'));
    table.draw(avgD, line_options);
    var table = new google.charts.Bar(document.getElementById('dGraph2'));
    table.draw(avgD, bar_options);
    plot1='line';
    plot2='bar';
}
//display estData charts
function estData(dP2) {
    var d = dP2;
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'State');
    data.addColumn('number',  'EstimatedPopulation');
    $.each(d, function(i, d) {
        var c = d.State;
        var tw = parseInt(d.EstimatedPopulation);
        data.addRows([[c, tw]]);
    });
    var estD = google.visualization.data.group(data, [{
        column: 0,
        label: 'State',
        type:'string'  
    }], [{
        column: 1,
        label: 'Estimated Population',
        aggregation: google.visualization.data.avg,
        type: 'number'
    }]);
    var line_options = {
        width: '1000px',
        height: 500,
        hAxis:{
            textPosition:'out',
            slantedText: true,
            slantedTextAngle: -90
        }
    };
    var bar_options = {
        bars: 'horizontal',
        height: 500,
        width: '1000px'
    }
    var table = new google.visualization.LineChart(document.getElementById('displayGraph'));
    table.draw(estD, line_options);
    var table = new google.charts.Bar(document.getElementById('dGraph2'));
    table.draw(estD, bar_options);
    plot1='line';
    plot2='bar';
}
//display count data charts
function cData(dP2) {
    var d = dP2;
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'State');
    data.addColumn('number',  'RecordNumber');
    $.each(d, function(i, d) {
        var c = d.State;
        var rn = parseInt(d.RecordNumber);
        data.addRows([[c, rn]]);
    });
    var cD = google.visualization.data.group(data, [{
        column: 0,
        label: 'State',
        type:'string'  
    }], [{
        column: 1,
        label: 'Number of Record Numbers',
        aggregation: google.visualization.data.count,
        type: 'number'
    }]);
    var pie_options = {
        width: '1000px',
    };
    var bar_options = {
        bars: 'horizontal',
        height: 500,
        width: '1000px'
    }
    var table = new google.visualization.PieChart(document.getElementById('displayGraph'));
    table.draw(cD, pie_options);
    var table = new google.charts.Bar(document.getElementById('dGraph2'));
    table.draw(cD, bar_options);
    plot1='pie';
    plot2='bar';
}
//get updated Slider data
function pullData() {
    avgValue= document.getElementById("avgRange").value;
    estValue = document.getElementById("estRange").value; 
   $("#av").text(avgValue);
   $("#ev").text(estValue);
}
function saveSetting() {
    // save_avgValue= document.getElementById("avgRange").value;
    // save_estValue = document.getElementById("estRange").value; 
    console.log('avg V: ', avgValue);
    console.log(' est v: ', estValue);
    console.log('id: ', id);
    console.log('login: ', login);
    if (id == undefined && login == undefined ) {
        $('#messageArea').text("Please log in and load data");
    } else {
         $.ajax({
        url: './saveData.php',
        type: 'POST',
        data: {id:id, login:login, avgValue:avgValue, estValue:estValue},
        dataType: 'json',
        success:function(response)
            {
                console.log(response);
                $('#messageArea') .text(response);
            }
        })
    }
}
function newCharts() {
	$("#displayGraph").empty();
	$("#dGraph2").empty();	
	df = new dfd.DataFrame(dataP2);
	let sub_df = df.loc({columns:["State", "AvgWages"]});
	let df2 = sub_df.groupby(["State"]);
	let df3 = df2.col(["AvgWages"]).mean().plot(displayGraph).scatter({config: {x:"State", y:"AvgWages_mean"}});
   let est_df = df.groupby(["State"]).col(["EstimatedPopulation"]).mean();
	est_df["EstimatedPopulation_mean"].plot(dGraph2).box();

	plot1="scatterplot";
	plot2="boxplot";
}













// https://www.valentinog.com/blog/html-table/
