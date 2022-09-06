const form = document.getElementById('form');

const table = document.getElementById('table');
var backupTable = '';

const handleCreate = e => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const phone = document.getElementById('phone').value;

    table.innerHTML += `
      <tr id=${id}>
      <td>${name}</td>
      <td>${id}</td>
      <td>${phone}</td>
      <td><div class=${id}><button onclick="removeLine('${id}')">X</button> </div></td>
      </tr>
      `;

    document.getElementById('name').value = '';
    document.getElementById('id').value = '';
    document.getElementById('phone').value = '';

    backupTable = table.innerHTML;
};

function tableToJson(table) {
    var data = [];
    for (var i = 1; i < table.rows.length; i++) {
        var tableRow = table.rows[i];
        var rowData = [];
        for (var j = 0; j < tableRow.cells.length; j++) {
            rowData.push(tableRow.cells[j].innerHTML);
        }
        data.push(rowData);
    }
    return data;
}

const searchInput = document.getElementById('search');

const removeLine = id => {
    const line = document.getElementById(id);
    line.innerHTML = '';
    const btn = document.getElementsByClassName(id)[0];
    btn.innerHTML = '';
};

const handleSearch = () => {
    const { value } = searchInput;
    const JsonTable = tableToJson(table);

    const filtredArray =
        value.length > 0
            ? JsonTable.filter(item =>
                  item[0].toLowerCase().includes(value.toLowerCase())
              )
            : backupTable;
    if (value.length > 0) {
        table.innerHTML =
            `
            <tr>
            <td>Nome</td>
            <td>ID</td>
            <td>Número</td>
            </tr>
            ` +
            filtredArray
                .map(
                    item =>
                        `<tr id=${item[1]}>
                        <td>${item[0]}</td>
                        <td>${item[1]}</td>
                        <td>${item[2]}</td>
                        <td><div class=${item[1]}><button onclick="removeLine('${item[1]}')">X</button> </div></td>
                        </tr>`
                )
                .toString()
                .replace(',', '');
    } else {
        table.innerHTML = backupTable;
    }
};
// searchInput.onkeydown = handleSearch()
searchInput.addEventListener('input', handleSearch);

form.addEventListener('submit', handleCreate);
