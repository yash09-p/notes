let p = document.querySelector("#noteTitle");
let g = document.querySelector("#noteContent");
let k = document.querySelector("#addNoteBtn");
let f = document.querySelector("#notesContainer");
let mi = document.querySelector(".deletebtn");
let ni = document.querySelector(".editbtn");
let sear = document.querySelector("#searchInput");

let data = localStorage.getItem("notes");
let arr = JSON.parse(data) || [];

k.addEventListener("click", function () {
  let notes = {
    title: p.value,
    content: g.value,
    date: new Date().toLocaleDateString(),
  };

  if (editIndex === -1) {
    arr.push(notes);
  } else {
    arr[editIndex] = notes;
    editIndex = -1;
  }

  let str = JSON.stringify(arr);
  localStorage.setItem("notes", str);

  p.value = "";
  g.value = "";

  console.log(arr);

  display(arr);
});

function display(notesArray) {
  f.innerHTML = "";

  for (let i = 0; i < notesArray.length; i++) {
    let z = document.createElement("h3");
    z.innerText = notesArray[i].title;

    let m = document.createElement("p");
    m.innerText = notesArray[i].content;

    let k = document.createElement("span");
    k.innerText = notesArray[i].date;

    let card = document.createElement("div");
    card.className = "note-card";

    card.appendChild(z);
    card.appendChild(m);
    card.appendChild(k);

    del(card, i);
    edi(card, i);

    f.appendChild(card);
  }
}

function del(card, i) {
  let my = document.createElement("button");

  my.addEventListener("click", function () {
    arr.splice(i, 1);

    let str = JSON.stringify(arr);
    localStorage.setItem("notes", str);

    display(arr);
  });

  my.className = "delete-btn";
  my.textContent = "Delete";

  card.appendChild(my);
}

let editIndex = -1;

function edi(card, i) {
  let ny = document.createElement("button");

  ny.addEventListener("click", function () {
    editIndex = i;

    p.value = arr[i].title;
    g.value = arr[i].content;
  });

  ny.className = "editbtn";
  ny.textContent = "edit";

  card.appendChild(ny);
}

display(arr);
sear.addEventListener("input", function () {
  let text = sear.value.toLowerCase();

  let result = arr.filter(function (item) {
    return (
      item.title.toLowerCase().includes(text) ||
      item.content.toLowerCase().includes(text)
    );
  });

  display(result);
});
