$(document).ready(function () {
    document.getElementById('upload').addEventListener('click', () => {
        function getData() {
            var file = document.getElementById('csvFile').files[0];
            fileValidation();
        }
            
    })
});

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
                buildTable(bbData);

            }
        });
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

function logIn() {
   document.getElementById('myForm').style.display = "block";

}

function closeForm() {
    documend.getElementById('myForm').style.display="none";
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


   



































// https://www.valentinog.com/blog/html-table/