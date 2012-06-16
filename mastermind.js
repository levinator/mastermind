var felder = 4;
var zuege = 8;
var palette = ['blue', 'red', 'green', 'pink', 'purple', 'yellow'];
var farben = palette.length;

var neues_brett = function(breite, hoehe) {
  var brett = $('table#brett');
  var colgroup = $('<colgroup><col id="bewertung"/></colgroup>');
  var geheim = $('<tr id="geheim"><td id="zaehler"></td></tr>');
  for (var i = 0; i < breite; i++) {
    colgroup.append($('<col class="brett"/>'));
    geheim.append($('<th>?</th>'));
  }
  brett.append(colgroup);
  brett.append(geheim);
  for (var j = hoehe; j > 0; j--) {
    var zeile = $('<tr><th></th></tr>');
    for (var i = 1; i <= breite; i++) {
      zeile.append($('<td id="' + id(i,j) + '"></td>'));
    }
    brett.append(zeile);
  }
  var farbwahl = $('table#farben tr');
  for (var f = 0; f < farben; f++) {
    farbwahl.append($('<td style="background-color:' + palette[f] + '"></td>'));
  }
}
var id = function(x,y) {
  return '_' + x + '_' + y;
}

$(document).ready(function(){
  neues_brett(felder, zuege);
  $('table#brett tr#geheim th').each(function() {
    $(this).data('farbe', palette[Math.floor(Math.random() * farben)]);
  });
});