//variables
const inputTextarea = document.querySelector("#tweet");
const btnSend = document.querySelector(".button");
let tweets = document.querySelector("#lista-tweets");
let seccionTweet = document.querySelector("#sec-tweet");

let getLocal;
let almacen = [];
let mensajesTweet;

iniciarFunctions();

function iniciarFunctions() {
  btnSend.addEventListener("click", createTweet);
  document.addEventListener("DOMContentLoaded", initialize);
}

//funciones

function createTweet(e) {
  e.preventDefault();

  let inputValue = inputTextarea.value;
  let error = seccionTweet.querySelector("#error");
  let sinTweet = tweets.querySelector("#sin-tweet");

  if (inputValue.length > 0) {
    error.textContent = "";
    mensajesTweet = {
      tweet: inputValue,
      id: Date.now(),
    };
  } else {
    error.textContent = "No puede enviar un Tweet vacio!";
    error.className =
      "color:red; text-align:center;font-weight:bold;,font-size:15px;";

    return error;
  }

  if (localStorage.getItem("tweets")) {
    //tweets.removeChild(sinTweet);

    let storage = JSON.parse(localStorage.getItem("tweets"));
    storage.push(mensajesTweet);

    localStorage.setItem("tweets", JSON.stringify(storage));

    createElementIni(storage[storage.length - 1], true);
  } else {
    tweets.removeChild(sinTweet);

    almacen.push(mensajesTweet);

    localStorage.setItem("tweets", JSON.stringify(almacen));
    getLocal = JSON.parse(localStorage.getItem("tweets"));

    createElementIni(mensajesTweet, false);
  }
}

function deleteTweet(e) {
  let id = Number(e.target.parentElement.dataset.id);
  let elemento = document.getElementById(id);
  let storage = JSON.parse(localStorage.getItem("tweets"));
  let removeTweet = storage.filter((e) => e.id !== id);

  tweets.removeChild(elemento);

  localStorage.setItem("tweets", JSON.stringify(removeTweet));
}

function createElementIni(obj, estadoIni) {
  let div = document.createElement("div");
  div.style = `background: #f3f3f3;
    border-radius: 10px;
    border: 1px solid #0000000f;
    box-shadow: 2px 2px 4px 0 #16161621;
    margin:1.5em`;

  let btnDelete = document.createElement("div");
  btnDelete.innerHTML = `<span class="iconify" data-icon="fluent:delete-48-regular"></span>`;
  btnDelete.style = `
    display: inline-block;
    font-size: 2.5em;
    transform: translateY(20px);
    cursor: pointer;`;
  btnDelete.addEventListener("click", deleteTweet);

  let p = document.createElement("p");
  p.style =
    "font-size:1.5em; text-align:center; word-wrap: break-word;transform: translateY(40px);padding: 0 1em;";

  if (estadoIni !== false) {
    const { tweet, id } = obj;
    p.textContent = tweet;
    btnDelete.dataset.id = id;
    div.id = id;
  } else {
    const { tweet, id } = obj;
    p.textContent = tweet;
    btnDelete.dataset.id = id;
    div.id = id;
  }

  div.appendChild(p);
  div.appendChild(btnDelete);
  tweets.appendChild(div);
}

function initialize() {
  getLocal = JSON.parse(localStorage.getItem("tweets"));
  let p = document.createElement("p");
  p.id = "error";

  seccionTweet.appendChild(p);

  if (getLocal) {
    getLocal.map((e) => createElementIni(e, true));
  } else {
    let p = document.createElement("p");
    p.textContent = "No hay ningun Tweet guardado :(";
    p.className =
      "color:blue; text-align:center;font-weight:bold;font-size:20px;";

    p.id = "sin-tweet";
    tweets.appendChild(p);
  }
}
