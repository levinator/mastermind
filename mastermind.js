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
  brett.data('aktuell', id(1,1));
  brett.data('breite', breite);
  brett.data('hoehe', hoehe);
  faerbe_aktuell(brett, id(1,1));
}
var id = function(x,y) {
  return '_' + x + '_' + y;
}

var faerbe_aktuell = function(brett, id) {
  brett.find('#' + id).css('background-color', '#dda');
  brett.data('aktuell', id);
}

var einfaerbung = function(brett, farbe) {
  var aktuell = $('#' + brett.data('aktuell'));
  aktuell.css('background-color', farbe);
  var naechstes_in_zeile = aktuell.next();
  if (naechstes_in_zeile.size() == 0) {
    var auswertung = werte_aus(aktuell.parent(), brett.find('#geheim'));
    var naechste_zeile = aktuell.parent().prev();
    if (naechste_zeile.attr('id') == 'geheim') {
      if (auswertung == false) {
        game_over();
      } else {
        glueckwunsch();
      }
    } else {
      var erste_zelle = naechste_zeile.find('td:first-of-type');
      faerbe_aktuell(brett, erste_zelle.attr('id'));
    }
  } else {
    faerbe_aktuell(brett, naechstes_in_zeile.attr('id'));
  }
}

var werte_aus = function(auszuwertend, geheim) {
  for (var i = 1; i <= geheim.find('th').size(); i++) {
    alert(i);
  }
  return true;
}

var glueckwunsch = function() {
  alert('Herzlichen Glückwunsch!');
}

var game_over = function() {
  alert('Schade. Nochmal versuchen?');
}


$(document).ready(function(){
  neues_brett(felder, zuege);
  $('table#brett tr#geheim th').each(function() {
    $(this).data('farbe', palette[Math.floor(Math.random() * farben)]);
  });
  $('table#farben td').click(function() {
    einfaerbung($('table#brett'), palette[$(this).index()]);
  });
 });
