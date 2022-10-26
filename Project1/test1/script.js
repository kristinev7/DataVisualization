$(document).ready(function () {
    document.getElementById('upload').addEventListener('click', () => {
        function getData() {
            var file = document.getElementById('csvFile').files[0];
            fileValidation();
        }  
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
    
})

function fileValidation() {
    var file = document.getElementById('csvFile');
    var filePath = file.value;
    console.log("file value:", file.value);
    var allowedExtension = /(\.csv)$/i;
    if(!allowedExtension.exec(filePath)) {
        alert('The data is in wrong format. Only CSV file can be loaded!');
        return false;
    } else {
        parseData();
    }
};

function parseData(){
    Papa.parse(document.getElementById('csvFile').files[0],
        {
            download: true,
            header: false,
            skipEmptyLines: true,
            complete: function(res) {
                //console.log(res.data);
                var bbData=res.data;
                console.log(bbData);
                // console.log(bbData[0]);
                // console.log(headers);
                //buildTable(bbData);
                
            }
        });
    }

function giveInfo(){
    alert("Kristine Veneles, CPS4745, Project due Oct. 26, 2022");
}

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

function viewUserInfo(uid, login, name, gender) {
    let info = uid + ", " + login + ", " + name + ", " + gender;
    alert(info);
}

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

function closeWindow() {
    if (confirm("Close Window?")) {
        window.open('','_parent','');
        window.close();
    }
}

function buildTable (data) {
    let myTable = document.querySelector('#table');
    var table = document.createElement('table');
    var headerRow = document.createElement('tr');
    let headers = data[0];
    console.log(headers);
    headers.forEach(header => {
        var header = document.createElement('th');
        let dData = document.createTextNode(header);
        header.appendChild(dData);
        headerRow.appendChild(header);
    });
    
    table.appendChild(headerRow);

    data.forEach(txt => {
        let row = document.createElement('tr');
        Object.values(txt).forEach(val => {
            let cell = document.createElement('td');
            let dData = document.createTextNode(val);
            cell.appendChild(dData);
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
    myTable.appendChild(table);
}


























// https://www.valentinog.com/blog/html-table/