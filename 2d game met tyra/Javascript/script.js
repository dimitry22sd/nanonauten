// CONSTANTEN
var CANVAS_BREEDTE = 800;
var CANVAS_HOOGTE = 600;
var NANONAUT_BREEDTE = 181;
var NANONAUT_HOOGTE = 229;
var GROND_Y = 540;
var NANONAUT_Y_VERSNELLING = 1;
var NANONAUT_SPRONG_SNELHEID = 20;
var NANONAUT_X_SNELHEID = 5;
var SPATIEBALK_CODE = 'Space';
var NANONAUT_NR_FRAMES_PER_RIJ = 5;
var NANONAUT_NR_ANIMATIEFRAMES = 7;
// INSTELLINGEN
var canvas = document.createElement('canvas');
var c = canvas.getContext('2d');
canvas.width = CANVAS_BREEDTE;
canvas.height = CANVAS_HOOGTE;
document.body.appendChild(canvas);

var nanonoutAfbeelding = new Image();
nanonoutAfbeelding.src = '../images/geanimeerdeNanonaut.png';

var nanonautX = CANVAS_BREEDTE / 2;
var nanonautY = GROND_Y - NANONAUT_HOOGTE;

var achtergrondAfbeelding = new Image();
achtergrondAfbeelding.src = '../images/background.png';
var ACHTERGROND_BREEDTE = 1000;

var nanonautYsnelheid = 0;


window.addEventListener('keydown', onkeydown);
window.addEventListener('keyup', onkeyup);

var spatiebalkIsIngedrukt = false;
var nanonautFrameNr = 0;

var nanonautYsnelheid = 0;
var nanonautIsInDeLucht = false;

var cameraX = 0;
var cameraY = 0;

window.addEventListener('load',start);

function start() {
    window.requestAnimationFrame(hoofdlus);
}
//HOOFD_LUS

function hoofdlus() {
    update();
    draw();
    window.requestAnimationFrame(hoofdlus);
}
// SPELER_HANDELINGEN

function onkeydown(event) {
    if (event.code === SPATIEBALK_CODE) {
        spatiebalkIsIngedrukt = true;
    }

}

function onkeyup(event) {
    if (event.code === SPATIEBALK_CODE) {
        spatiebalkIsIngedrukt = false;
    }
}


// UPDATEN
function update() {
    nanonautX = nanonautX + NANONAUT_X_SNELHEID;
    if (spatiebalkIsIngedrukt && !nanonautIsInDeLucht) {
        nanonautYsnelheid = -NANONAUT_SPRONG_SNELHEID;
        nanonautIsInDeLucht = true;
    }

//Update de nanonaut
nanonautY = nanonautY + 1;

if (nanonautY > (GROND_Y - NANONAUT_HOOGTE)) {
    nanonautY = GROND_Y - NANONAUT_HOOGTE;}

    nanonautY = nanonautY + nanonautYsnelheid;
    nanonautYsnelheid = nanonautYsnelheid + NANONAUT_Y_VERSNELLING;

    if (nanonautY > (GROND_Y - NANONAUT_HOOGTE)) {
        nanonautY = GROND_Y - NANONAUT_HOOGTE;
        nanonautYsnelheid = 0;
        nanonautIsInDeLucht = false;
    }
    //Update de camera
    cameraX = nanonautX - 150;
}
// TEKENEN
function draw() {
    //teken de lucht
    c.fillStyle = 'LightSkyBlue';
    c.fillRect(0,0,CANVAS_BREEDTE,GROND_Y - 40);
    //Teken de achtergrond
    var achtergrondX = - (cameraX % ACHTERGROND_BREEDTE);
    c.drawImage(achtergrondAfbeelding, achtergrondX ,-210);
    c.drawImage(achtergrondAfbeelding, achtergrondX  + ACHTERGROND_BREEDTE,-210);
    //teken de grond
    c.fillStyle = 'forestgreen';
    c.fillRect(0,GROND_Y - 40, CANVAS_BREEDTE,CANVAS_HOOGTE - GROND_Y + 40);
    //teken de nanonaut
    var nanonautSpriteSheetRij = Math.floor(nanonautFrameNr / NANONAUT_NR_FRAMES_PER_RIJ);
    var nanonautSpriteSheetKolom = nanonautFrameNr % NANONAUT_NR_FRAMES_PER_RIJ;
    var nanonautSpriteSheetX = nanonautSpriteSheetKolom * NANONAUT_BREEDTE;
    var nanonautSpriteSheetY = nanonautSpriteSheetRij + NANONAUT_HOOGTE;
    c.drawImage(nanonoutAfbeelding,nanonautSpriteSheetX, nanonautSpriteSheetY, NANONAUT_BREEDTE , NANONAUT_HOOGTE);
}