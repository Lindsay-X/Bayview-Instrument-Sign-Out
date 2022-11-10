var table = document.querySelector('#tbl-log')
var selectedCells = table.getElementsByClassName('selected')

console.log("Hello");

table.addEventListener('click', function(e) {
  var td = e.target
  
  if (td.tagName !== 'TD') {
    return
  }

  td.className = 'selected'

  if (selectedCells.length) {
    selectedCells[0].className = ''    
  }
});