'use strict';


var emojies_defs      = require('./lib/data/full.json');
var emojies_shortcuts = require('./lib/data/shortcuts');
var emoji_html        = require('./lib/render');
var emoji_replace     = require('./lib/replace');
var normalize_opts    = require('./lib/normalize_opts');
try {
    console.log(require.resolve("twemoji"));
} catch(e) {
    console.error("run git clone https://github.com/twitter/twemoji.git under markdown-it-emoji first!");
}
var twemoji = require('twemoji')


module.exports = function emoji_plugin(md, options) {
  var defaults = {
    defs: emojies_defs,
    shortcuts: emojies_shortcuts,
    enabled: []
  };

  var opts = normalize_opts(md.utils.assign({}, defaults, options || {}));

  //md.renderer.rules.emoji = emoji_html;
  
  md.renderer.rules.emoji = function(token, idx) {
    return twemoji.parse(token[idx].content, {
      className: "nofancybox emoji"
    });
  };

  md.core.ruler.push('emoji', emoji_replace(md, opts.defs, opts.shortcuts, opts.scanRE, opts.replaceRE));
};
