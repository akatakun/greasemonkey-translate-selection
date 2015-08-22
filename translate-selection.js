// ==UserScript==
// @name        translate-selection
// @namespace   akata
// @include     *
// @version     1
// @grant       GM_xmlhttpRequest
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
function KeyCheck(e) {
  // When press 'a' key, translate selection with Weblio.
  if(e.keyCode === 65) {
    var selection = window.getSelection();
    GM_xmlhttpRequest( {
        method: 'POST',
        url: 'http://translate.weblio.jp/',
        data: 'lp=' + encodeURIComponent('EJ') + '&originalText=' + encodeURIComponent(selection),
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(response) {
          var dom = $.parseHTML(response.responseText);
          console.info('* `' + selection + '`: ' + $(dom).find('.transExpB li').map( function() {
                return $(this).text();
          } ).get().join(', '));
          $(dom).find('.translatedTextAreaLn span').each(function() { console.info( '- ' + $(this).text()); } );
        }
    } );
  }
  // When press 'w' key, search selection with Wikipedia.
  if(e.keyCode === 87) {
    var selection = window.getSelection();
    var url = 'https://ja.wikipedia.org/w/index.php?search=' +  encodeURIComponent(selection);
    console.info(url);
    GM_xmlhttpRequest( {
        method: 'GET',
        url: url,
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(response) {
          var dom = $.parseHTML(response.responseText);
          console.info($(dom).find('.mw-body-content p:eq(1)').text());
        }
    } );
  }
}
window.addEventListener('keydown', KeyCheck, true);
