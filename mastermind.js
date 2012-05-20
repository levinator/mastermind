var felder = 8;
var zuege = 30;
var palette = ['blue', 'red', 'green', 'orange', 'purple', 'yellow'];
var farben = palette.length;

var neues_brett = function(breite, hoehe) {
  var brett = $('table#brett');
  var colgroup = $('<colgroup></colgroup>');
  var geheim = $('<tr id="geheim"><td id="zaehler"></td></tr>');
  for (var i = 0; i < breite; i++) {
    colgroup.append($('<col class="brett"/>'));
    geheim.append($('<th></th>'));
  }
  brett.append(colgroup);
  brett.append(geheim);
  for (var j = 0; j < hoehe; j++) {
    var zeile = $('<tr><th></th></tr>');
    for (var i = 0; i < breite; i++) {
      zeile.append($('<td></td>'));
    }
    brett.append(zeile);
  }
}
$(document).ready(function(){
  neues_brett(felder, zuege);
});