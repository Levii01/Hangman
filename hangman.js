// Tablica liter
var letters = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ'.split('');

// duze litery
var password = "";
// password.toUpperCase();

var howManyFail = 0;

// dźwięki
var yes = new Audio("blaster-firing.mp3");
var no = new Audio("chewy_roar.mp3");
var superwin = new Audio("star-wars-theme-song.mp3");
var superfail = new Audio("force.mp3");

var password1 = "";

function hidePw() {
    lengthPw = password.length;
    for (i = 0; i < password.length; i++) {
        //  charAt to to samo co tablica [i].. ale to funkcja!
        if (password.charAt(i) == " ") password1 = password1 + " ";
        else password1 = password1 + "-";
    }
}

function write_password() {
    document.getElementById("board").innerHTML = password1;
}
// wywołanie wyświetlenia hasła przez jakby.. alias
// mała zmiana.. teraz wywołujemy funkcje start gdzie wyświetlamy co trzeba
window.onload = setPw;


function setPw() {
    document.getElementById("alphabet").innerHTML = '<h2>Gra w Wisielca</h2> <br/> Pozwól komuś wpisać hasło aby zacząć.<br/><br/> <input type="text" id="place1" /> <input type="submit" value="Ustaw"  onclick="startGame()" class="button"/>';

}

// Funkcja do wyświetlania wszystkiego
function startGame() {

    password = document.getElementById("place1").value.toUpperCase();
    hidePw();
    var alphabet_holder_div = "";

    for (i = 0; i <= 34; i++) {
        var element = "lit" + i;
        alphabet_holder_div = alphabet_holder_div + '<div class="letter" onclick="check(' + i + ')" id="' + element + '">' +
            letters[i] + '</div>';
        if ((i + 1) % 7 == 0) alphabet_holder_div = alphabet_holder_div +
            '<div style="clear:both;"></div>'
    }

    document.getElementById("alphabet").innerHTML = alphabet_holder_div;

    write_password();
}

String.prototype.setChar = function (place, char) {
    // sprawdzenie długości wyrazy
    if (place > this.length - 1) return this.toString();
    else return this.substr(0, place) + char + this.substr(place + 1);
};

function check(nr) {

    var goodShot = false;

    for (i = 0; i < password.length; i++) {
        if (password.charAt(i) == letters[nr]) {
            password1 = password1.setChar(i, letters[nr]);
            goodShot = true;
        }
    }

    // Przyciskanie literek
    if (goodShot == true) {
        yes.play();
        var element = "lit" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "defualt";


        write_password()
    } else {
        no.play();
        var element = "lit" + nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "defualt";
        document.getElementById(element).setAttribute("onclick", ";");

        //skucha
        howManyFail++;
        var image = "img/s" + howManyFail + ".jpg";
        document.getElementById("gallows").innerHTML = '<img src="' + image + '" alt="" />';

    }

    // wygrana
    if (password == password1) {
        document.getElementById("alphabet").innerHTML = "Yeeah! Podano prawidłowe hasło: " + password +
            '<br/><br><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
        superwin.play();
    }

    //przegrana
    if (howManyFail >= 9) {
        document.getElementById("alphabet").innerHTML = "Emmm.. Niestety ale przegrałeś. Hasło to : " + password +
            '<br/><br><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
        setTimeout("superfail.play()", 1000);
    }
}
