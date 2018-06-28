var _load = function () {
  background.send("options:load");
  window.removeEventListener("load", _load, false);
  document.getElementById("support").addEventListener("click", function (e) {
    background.send("options:store", {"support": e.target.checked});
  });
};

window.addEventListener("load", _load, false);
background.receive("options:storage", function (e) {document.getElementById("support").checked = e.support});