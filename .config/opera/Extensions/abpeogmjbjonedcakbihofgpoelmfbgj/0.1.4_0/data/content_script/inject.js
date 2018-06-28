background.receive("page:storage", function (e) {
  var playerType = e.playerType;
  /*  */
  if (playerType === "flash") {
    var script = document.getElementById("yfh-flash-plugin-manager");
    if (script) script.parentNode.removeChild(script);
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.setAttribute("id", "yfh-flash-plugin-manager");
    script.textContent = 'document.createElement("video").constructor.prototype.canPlayType = function () {return ""}';
    if (document.documentElement) document.documentElement.appendChild(script);
  }
  /*  */
  if (playerType === "html5") {
    var navigatorTweek = function () {
      var _inject = function () {
        var plugins = {};
        for (var a in window.navigator.plugins) {
          var p = window.navigator.plugins[a];
          if (p.name && p.name.toLowerCase().indexOf("shockwave") === -1) {
            plugins[a] = window.navigator.plugins[a];
          }
        }
        window.navigator.__defineGetter__("plugins", function () {return plugins});
        var mimeTypes = {};
        for (var a in window.navigator.mimeTypes) {
          var p = window.navigator.mimeTypes[a];
          if (p.type && p.type !== "application/x-shockwave-flash") {
            mimeTypes[a] = window.navigator.mimeTypes[a];
          }
        }
        window.navigator.__defineGetter__("mimeTypes", function () {return mimeTypes});
      };
      /*  */
      var script = document.getElementById("yfh-html5-plugin-manager");
      if (script) script.parentNode.removeChild(script);
      script = document.createElement("script");
      script.type = "text/javascript";
      script.setAttribute("id", "yfh-html5-plugin-manager");
      script.textContent = "(" + _inject + ")()";
      if (document.documentElement) document.documentElement.appendChild(script);
    };
    /*  */
    navigatorTweek();
    /*  */
    var contentLoaded = function () {
      if (/^https?:\/\/www\.youtube.com\/watch\?/.test(window.location.href)) navigatorTweek();
      var content = document.getElementById('content');
      if (content) {
        var _mutation = window.MutationObserver;
        if (typeof _mutation !== 'undefined') {
          var observer = new _mutation(function (mutations) {
            mutations.forEach(function (mutation) {
              if (mutation.addedNodes !== null) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                  var _id = mutation.addedNodes[i].id;
                  if (_id) {
                    if (_id.indexOf('-main-container') !== -1 || _id.indexOf('watch7-container') !== -1) {
                      navigatorTweek();
                      return;
                    }
                  }
                }
              }
            });
          });
          observer.observe(content, {"childList": true, "subtree": true});
        }
      }
      window.removeEventListener('DOMContentLoaded', contentLoaded, false);
    };
    window.addEventListener('DOMContentLoaded', contentLoaded, false);
  }
});
/*  */
background.send("page:load");
background.receive("page:reload", function () {document.location.reload()});