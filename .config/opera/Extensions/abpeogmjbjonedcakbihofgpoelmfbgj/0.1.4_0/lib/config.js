var config = {};

config.welcome = {
  "timeout": 3000,
  set open (val) {app.storage.write("support", val)},
  get version () {return app.storage.read("version")},
  set version (val) {app.storage.write("version", val)},
  "url": "http://mybrowseraddon.com/youtube-flash-html.html",
  get open () {return (app.storage.read("support") !== undefined ? app.storage.read("support") : true)}
};

config.player = {
  set type (val) {app.storage.write("playerType", val)},
  get type () {return app.storage.read("playerType") || "flash"}
};