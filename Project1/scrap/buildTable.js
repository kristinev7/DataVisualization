// function buildTable (data) {
//     let myTable = document.querySelector('#table');
//     var table = document.createElement('table');
//     var headerRow = document.createElement('tr');
//     let headers = data[0];
//     console.log(headers);
//     headers.forEach(header => {
//         var header = document.createElement('th');
//         let dData = document.createTextNode(header);
//         header.appendChild(dData);
//         headerRow.appendChild(header);
//     });
    
//     table.appendChild(headerRow);

//     data.forEach(txt => {
//         let row = document.createElement('tr');
//         Object.values(txt).forEach(val => {
//             let cell = document.createElement('td');
//             let dData = document.createTextNode(val);
//             cell.appendChild(dData);
//             row.appendChild(cell);
//         });
//         table.appendChild(row);
//     });
//     myTable.appendChild(table);
// }