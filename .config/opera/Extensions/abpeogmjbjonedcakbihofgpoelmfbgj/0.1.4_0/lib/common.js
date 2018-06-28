window.setTimeout(function () {
  var _version = config.welcome.version;
  if (app.version() !== _version) {
    if (app.loadReason === "install" || app.loadReason === "startup") {
      if (config.welcome.open) {
        app.tab.open(config.welcome.url + "?v=" + app.version() + (_version ? "&p=" + _version + "&type=upgrade" : "&type=install"));
      }
      config.welcome.version = app.version();
    }
  }
}, config.welcome.timeout);

app.icon(config.player.type);
app.addon.receive("options:store", function (e) {config.welcome.open = e.support});
app.addon.receive("popup:support", function () {app.tab.open(config.welcome.url)});
app.addon.receive("popup:load", function () {app.addon.send("popup:storage", {"playerType": config.player.type}, null)});
app.addon.receive("options:load", function () {app.addon.send("options:storage", {"support": config.welcome.open}, null)});
app.addon.receive("page:load", function (e) {app.addon.send("page:storage", {"playerType": config.player.type}, (e ? e.tabId : null))});

app.addon.receive("popup:store", function (e) {
  config.player.type = e.playerType;
  app.icon(config.player.type);
  window.setTimeout(function () {app.addon.send("page:reload", null, null)}, 500);
});