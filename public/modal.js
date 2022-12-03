var modal = document.getElementById("addmodal");
var btn = document.getElementById("addaction");
var deleteBtn = document.getElementById("opendelete");
var close = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

close.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

deleteBtn.onclick = function () {
  document.querySelectorAll(".delete").forEach(function (X) {
    if (X.style.display == "inline-block") {
      X.style.display = "none";
    } else {
      X.style.display = "inline-block";
    }
  });
};

function search(columns) {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let x = document.getElementsByClassName("row");

  for (i = 0; i < x.length/columns; i++) {
    if (!removeTags(x[columns*i+1].innerHTML.toLowerCase()).includes(input)) {
      for (j = 0; j < columns; j++) {
        x[columns*i+j].style.display = "none";
      }
    } else {
      for (j = 0; j < columns; j++) {
        x[columns*i+j].style.display = "table-cell";
      }
    }
  }
}

function removeTags(string){ 
  return string.replace(/<[^>]*>.*?(<[^>]*>)?/g, ' ') .replace(/\s{2,}/g, ' ') .trim(); 
}
