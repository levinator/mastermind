var palette = ['blue', 'red', 'green', 'pink', 'purple', 'yellow'];
var farben = palette.length;

var neues_brett = function(breite, hoehe) {
  $('div#spiel').html('<table id="brett"></table><table id="farben"><tr></tr></table>');
  var brett = $('table#brett');
  var colgroup = $('<colgroup><col id="bewertung"/></colgroup>');
  var geheim = $('<tr id="geheim"><td id="zaehler" title="Punkte"></td></tr>');
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
  $('table#brett tr#geheim th').each(function() {
    var zufallsfarbe = palette[Math.floor(Math.random() * farben)];
    // alert(zufallsfarbe);
    $(this).data('farbe', zufallsfarbe);
  });
  $('table#farben td').click(function() {
    einfaerbung($('table#brett'), palette[$(this).index()]);
  });
}

var id = function(x,y) {
  return '_' + x + '_' + y;
}

var faerbe_aktuell = function(brett, id) {
  brett.find('#' + id).css('background-color', '#ffc');
  brett.data('aktuell', id);
}

var einfaerbung = function(brett, farbe) {
  var aktuell = $('#' + brett.data('aktuell'));
  aktuell.css('background-color', farbe);
  aktuell.data('farbe', farbe);
  var naechstes_in_zeile = aktuell.next();
  if (naechstes_in_zeile.size() == 0) { // Ende der Zeile
    var auswertung = werte_aus(aktuell.parent(), brett.find('#geheim'));
    if (auswertung) { // alles schwarz
      glueckwunsch();
    } else {
      var naechste_zeile = aktuell.parent().prev();
      if (naechste_zeile.attr('id') == 'geheim') { // keine Zeilen mehr übrig
        game_over();
      } else {
        var erste_zelle = naechste_zeile.find('td:first-of-type');
        faerbe_aktuell(brett, erste_zelle.attr('id'));
      }
    }
  } else {
    faerbe_aktuell(brett, naechstes_in_zeile.attr('id'));
  }
}

var werte_aus = function(auszuwertend, geheim) {
  // zurücksetzen
  geheim.find('th').each(function() {$(this).removeClass("zugeordnet");});
  // auf exakte Übereinstimmung prüfen: 
  auszuwertend.find('td').each( function() {
    var position = $(this).index();
    var gleiche_position_in_geheim = geheim.find('th:nth-of-type(' + position + ')');
    if ($(this).data('farbe') == gleiche_position_in_geheim.data('farbe')) {
      $(this).addClass('schwarz');
      gleiche_position_in_geheim.addClass('zugeordnet');
    } 
  });
  // die weißen Auswertungen finden:
  auszuwertend.find('td[class!="schwarz"]').each( function() {
    var auszuwertende_zelle = $(this);
    geheim.find('th[class!="zugeordnet"]').each(function() {
      if ($(this).data('farbe') == auszuwertende_zelle.data('farbe')) {
        $(this).addClass('zugeordnet');
        auszuwertende_zelle.addClass('weiss');
        return false;
      }
    });
  });
  var auswertungszelle = auszuwertend.find('th');
  auszuwertend.find('td.schwarz').each(function() {
    auswertungszelle.append('<span style="color:black">&#x2022;</span> ');
  });
  auszuwertend.find('td.weiss').each(function() {
    auswertungszelle.append('<span style="color:white">&#x2022;</span> ');
  });
  if (auszuwertend.find('td[class!="schwarz"]').size() == 0) {
    // alles schwarz, also gewonnen:
    return true;  
  } else {
    return false;
  }
}

var glueckwunsch = function() {
  aufdecken();
  // Punkte
  $('#zaehler').text(1 * $('#brett').data('hoehe') + 1 - 1 * $('#brett').data('aktuell').replace(/^_[0-9]+_/, ''));
  alert('Herzlichen Glückwunsch!');
}

var game_over = function() {
  aufdecken();
  alert('Schade. Versuch es noch einmal.');
  neues_brett($('input#breite').val(), $('input#hoehe').val());
}

var aufdecken = function() {
  $('#geheim th').each(function() {
    $(this).css('background-color', $(this).data('farbe'));
    $(this).text('!');
  });
}

$(document).ready(function(){
  neues_brett($('input#breite').val(), $('input#hoehe').val());
 });
