'use strict';


var emojies_defs      = require('./lib/data/full.json');
var emojies_shortcuts = require('./lib/data/shortcuts');
var emoji_html        = require('./lib/render');
var emoji_replace     = require('./lib/replace');
var normalize_opts    = require('./lib/normalize_opts');

var twemoji = require('twemoji')
var emojione = require('emojione');
var cheerio = require('cheerio');

module.exports = function emoji_plugin(md, options) {
  var defaults = {
    defs: emojies_defs,
    shortcuts: emojies_shortcuts,
    enabled: []
  };

  var opts = normalize_opts(md.utils.assign({}, defaults, options || {}));

  //md.renderer.rules.emoji = emoji_html;
  
  //md.renderer.rules.emoji = function(token, idx) {
  //  return twemoji.parse(token[idx].content, {
  //    className: "nofancybox emoji"
  //  });
  //};
  
  md.renderer.rules.emoji = function(token, idx) {
    var result = emojione.unicodeToImage(token[idx].content); var cheerio = require('cheerio');
    var $ = cheerio.load(result, {
        ignoreWhitespace: false,
        xmlMode: false,          
        lowerCaseTags: false,      
        decodeEntities: false    
    });
    $('img').removeAttr('title');
    $('img').addClass('nofancybox');
    $('img').addClass('emoji');
    $('img').attr('draggable', false);
    return $.html();
  };

  md.core.ruler.push('emoji', emoji_replace(md, opts.defs, opts.shortcuts, opts.scanRE, opts.replaceRE));
};
