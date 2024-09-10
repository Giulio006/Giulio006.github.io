// Dichiarazione delle variabili globali
let player;
let ostHome;
let ostBattle;
let sfondo;
let fontGioco;
let topo1;
let topo2;
let topo3;
let cuore;
let danno; 
let cuoreNemico;
let cuoreNemicoPerso;

let meteoraOmbra;
let meteora;
let esplosione;
let pausaImg;
let laser;
let laserVerticale;
let setBossImg;
let selectLevelImg;

// Variabili utili alla gestione della schermata home
let homePlayPremuto;
let homeTutorialPremuto;
let homeCreditsPremuto;

let homeBlock = false;

let homeSet;  // Variabile di appoggio per la gestione delle immagini della home

let tutorialImg;
let creditsImg;

// Variabili utili alla gestione degli oggetti selezionati con il comando ITEM
let preso1 = false;
let preso2 = false;
let preso3 = false;

let schermataItem;
let schermataItem1;
let schermataItem2;
let schermataItem3;
let schermataItem12;
let schermataItem13;
let schermataItem23;
let schermataItem123;

let itemMillis;  // Variabile utile a gestire il tempo trascorso dall'ultimo danno ricevuto quando c'è la schermata ITEM

// Variabili utili a gestire la direzione in cui è rivolto il giocatore
let right = true;
let left = false;

let curato = false;   // Variabile utile per la gestione della cura del comando HEAL

// Immagini relative al giocatore
let playerCorreDx;
let playerCorreSx;

let posa1;
let posa2;

let success;

let ostHomeIsPlaying = false;
let ostBattleIsPlaying = false;

let cuorePerso;

let successPlaying = false;
let t = 0;
let block = false;    // Variabile utile alla gestione della scrittura su tastiera
let boostDanno = 1;

let livello = -1;   // Variabile che indica la schermata che si sta visualizzando

// Variabili utili alla gestione delle meteore
let ombraBlock = false;
let meteoraFerma = false;
let tMeteora = 0;

let nMeteore = 0;
let meteore = [];

let bossAttacca = true;
let setMeteora;

let bossHaAttaccato = false;

// Variabili utili a contenere le immagini per le schermate di game over e di vittoria
let gameOverImg;
let youWinImg;

// Variabili utili alla gestione della pausa
let abilitaPausa = true;
let pausaMillis = 0;

// Variabili utili alla gestione dei tasti premuti sulla tastiera
let escEPremuto = false;
let spacePremuto = false;
let upPremuto = false;
let downPremuto = false;
let backspacePremuto = false;

// Variabili utili alla gestione dei setup per ogni livello
let setupLevel1 = false;
let setupLevel2 = false;
let setupLevel3 = false;

// Variabili utili alla gestione del conteggio del tempo impiegato per superare un livello
let timerCountdown = 0;
let counter = 0;

///////////////////////////////////////PRELOAD: caricamento immagini, suoni e font
function preload(){
  playerCorreDx = loadImage('./img/gattoDx.gif');
  playerCorreSx = loadImage('./img/gattoSx.gif');
  sfondo = loadImage('./img/sfondo.jpg');
  fontGioco = loadFont('./font/PixeloidSans-mLxMm.ttf');
  ostHome = loadSound('./sound/home.m4a');
  ostBattle = loadSound('./sound/battle.mp3');
  success = loadSound('./sound/success.mp3');
  topo1 = loadImage('./img/topo1.png');
  topo2 = loadImage('./img/topo2.png');
  topo3 = loadImage('./img/topo3.png');
  cuore = loadImage('./img/cuore.png');
  cuorePerso = loadImage('./img/cuorePerso.png');
  danno = loadSound('./sound/hurt.mp3');
  cuoreNemico = loadImage('./img/cuoreNemico.png');
  cuoreNemicoPerso = loadImage('./img/cuoreNemicoPerso.png');
  posa1 = loadImage('./img/posa1.png');
  posa2 = loadImage('./img/posa2.png');
  schermataItem = loadImage('./img/item.png');
  schermataItem1 = loadImage('./img/item1.png');
  schermataItem2 = loadImage('./img/item2.png');
  schermataItem3 = loadImage('./img/item3.png');
  schermataItem12 = loadImage('./img/item12.png');
  schermataItem13 = loadImage('./img/item13.png');
  schermataItem23 = loadImage('./img/item23.png');
  schermataItem123 = loadImage('./img/item123.png');
  meteoraOmbra = loadImage('./img/meteoraOmbra.png');
  meteora = loadImage('./img/meteora.gif');
  esplosione = loadImage('./img/esplosione.png');
  setMeteora = loadImage('./img/meteora.gif');
  pausaImg = loadImage('./img/pausa.png');
  laser = loadImage('./img/laser.gif');
  laserVerticale = loadImage('./img/laser2.gif');
  homePlayPremuto = loadImage('./img/homePlaySelezionato.png');
  homeTutorialPremuto = loadImage('./img/homeTutorialSelezionato.png');
  homeCreditsPremuto = loadImage('./img/homeCreditsSelezionato.png');
  homeSet = homePlayPremuto;
  tutorialImg = loadImage('./img/tutorial.png');
  creditsImg = loadImage('./img/creditsErica.png');
  selectLevelImg = loadImage('./img/selectLevel.png');
  gameOverImg = loadImage('./img/gameOver.png');
  youWinImg = loadImage('./img/youWin.png');
}

///////////////////////////////////////SETUP: codice eseguito una sola volta
function setup() {
  // Settaggio del loop delle colonne sonore
  ostHome.setLoop(true);
  ostBattle.setLoop(true);
  createCanvas(windowWidth - 20, windowHeight - 20);
  frameRate(60);  // Fotogrammi al secondo
  // Inizializzazione dell'oggetto player con le dimensioni e la posizione iniziale
  player = new Player(width / 4, height/2, 200, 94);
  boss = new Boss(width/2, height/2, 300); // Inizializzazione dell'oggetto boss
  textAlign(CENTER);
  generaOggettiMeteora();
}

///////////////////////////////////////DRAW: codice continuamente eseguito
function draw() {
  if(livello == -1){
    start();          // Schermata che precede la schermata home
  } else if(livello == 0){
    home();           // Schermata home dalla quale si può accedere alla scelta del livello, al tutorial e ai crediti
  } else if(livello == 1){
    selectLevel();    // Schermata di scelta del livello
  } else if(livello == 2){
    gameOver();       // Schermata di game over
  } else if(livello == 3){
    item();           // Schermata degli oggetti (visualizzabile col comando ITEM)
  } else if(livello == 4){
    pausa();          // Schermata di pausa
  } else if(livello == 5){
    youWin();         // Schermata di vittoria
  } else if(livello == 6){
    tutorial();       // Schermata del tutorial
  } else if(livello == 7){
    credits();        // Schermata dei crediti
  } else if(livello == 8){
    livello1();       // Primo livello
  } else if(livello == 9){
    livello2();       // Secondo livello
  } else if(livello == 10){
    livello3();       // Terzo livello
  }
}

function start(){
  background(0);

  fill(0, 0, 255);
  textFont(fontGioco);
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(40);
  text("PRESS BACKSPACE TO START PLAYING", width / 2, height / 2);
  if(backspacePremuto){
    livello = 0;
  }
}

function home(){
  if(!ostHomeIsPlaying){
    ostHome.play();
    ostHomeIsPlaying = true;
  }
  background(homeSet);
  
  if (!downPremuto && !upPremuto) {
    homeBlock = false;
  }
  
  gestisciTransizioni();

  controllaHomeBlock();
  if (!downPremuto && !upPremuto) {
    homeBlock = false;
  }

  homeControllaScelta();
}

// Funzioni utile alla selezione presente nella schermata home
function gestisciTransizioni() {
  if (homeSet === homePlayPremuto && downPremuto && !homeBlock) {
    homeSet = homeTutorialPremuto;
  } else if (homeSet === homeTutorialPremuto && upPremuto && !homeBlock) {
    homeSet = homePlayPremuto;
  } else if (homeSet === homeTutorialPremuto && downPremuto && !homeBlock) {
    homeSet = homeCreditsPremuto;
  } else if (homeSet === homeCreditsPremuto && upPremuto && !homeBlock) {
    homeSet = homeTutorialPremuto;
  }
}

function homeControllaScelta(){
  if(homeSet === homePlayPremuto && spacePremuto){
    livello = 1;
  }

  if(homeSet === homeTutorialPremuto && spacePremuto){
    livello = 6;
  }

  if(homeSet === homeCreditsPremuto && spacePremuto){
    livello = 7;
  }
}

function selectLevel(){
  background(selectLevelImg);
  if(!ostHomeIsPlaying){
    ostHome.play();
    ostHomeIsPlaying = true;
  }
  if(keyCode == 49){ //1
    ostHome.stop();
    ostHomeIsPlaying = false;
    livello = 8;
  }
  if(keyCode == 50){ //2
    ostHome.stop();
    ostHomeIsPlaying = false;
    livello = 9;
  }
  if(keyCode == 51){ //3
    ostHome.stop();
    ostHomeIsPlaying = false;
    livello = 10;
  }
  if(escEPremuto){
    livello = 0;
  }
}

// Funzione utile per resettare specifici attributi degli oggetti player e boss e alcune variabili globali
function resetAll(){
  player.setMaxHp(5);
  player.setHp(player.getMaxHp());
  player.x = 300;
  player.y = height / 2;
  player.resetImg();
  bossAttacca = true;
  preso1 = false;
  preso2 = false;
  preso3 = false;
  player.hp = 5;
  player.speed = 7;
  boostDanno = 1;
  generaOggettiMeteora();
  boss.laserY = 0;
  boss.laserGiu = true;
  boss.laserSu = false;
  right = true;
  left = false;
  meteore = [];
  setupLevel1 = false;
  setupLevel2 = false;
  setupLevel3 = false;
  ostBattleIsPlaying = false;
  counter = 0;
  timerCountdown = 0;
}


function livello1(){
  if(!setupLevel1){
    boss.hp = 10;
    boss.maxHp = 10;
    boss.sizeX = 200;
    setBossImg = topo1;
    nMeteore = 10;
    setupLevel1 = true;
  }
  background(sfondo);
  if(!abilitaPausa)
    setTimeout(setPausa, 200);
  if(bossHaAttaccato){
    generaOggettiMeteora();
    bossHaAttaccato = false;
  }

  getTyped();

  if(bossAttacca)
    clockAttacco();
  if(!ostBattleIsPlaying){
    ostBattle.play();
    ostBattleIsPlaying = true;
  }

  if(player.getSiMuove()){
    animazioneCammina();
    player.resetSpell();
  } else {
    setImgPlayerBase();
  }
  
  if(!bossAttacca){
    boss.attacca();
  }

  player.show();
  boss.show();


  // Chiamata ai metodi di movimento e visualizzazione del giocatore
  player.move();
  boss.deal();
  
  player.display();
  boss.display();

  if(escEPremuto && abilitaPausa){
    pausaMillis = millis();
    livello = 4;
  }
    
  fill(0, 0, 255);
  textFont(fontGioco);
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(40);
  text("Typed: ", 90, height - 10);
  text("Press ESC to pause the game", width * 7/9, height - 10);

  countdown();
  displayTimer();

  if(boss.hp <= 0){
    livello = 5;
  }
}

function livello2(){
  if(!setupLevel2){
    boss.hp = 15;
    boss.maxHp = 15;
    boss.sizeX = 250;
    setBossImg = topo2;
    nMeteore = 15;
    setupLevel2 = true;
  }
  background(sfondo);
  if(!abilitaPausa)
    setTimeout(setPausa, 200);
  if(bossHaAttaccato){
    generaOggettiMeteora();
    bossHaAttaccato = false;
  }

  getTyped();

  if(bossAttacca)
    clockAttacco();
  if(!ostBattleIsPlaying){
    ostBattle.play();
    ostBattleIsPlaying = true;
  }

  if(player.getSiMuove()){
    animazioneCammina();
    player.resetSpell();
  } else {
    setImgPlayerBase();
  }
  
  if(!bossAttacca){
    boss.attacca();
  }

  player.show();
  boss.show();


  // Chiamata ai metodi di movimento e visualizzazione del giocatore
  player.move();
  boss.deal();
  
  player.display();
  boss.display();

  if(escEPremuto && abilitaPausa){
    pausaMillis = millis();
    livello = 4;
  }
    
  fill(0, 0, 255);
  textFont(fontGioco);
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(40);
  text("Typed: ", 90, height - 10);
  text("Press ESC to pause the game", width * 7/9, height - 10);

  countdown();
  displayTimer();

  if(boss.hp <= 0){
    livello = 5;
  }
}

function livello3(){
  if(!setupLevel3){
    boss.hp = 20;
    boss.maxHp = 20;
    boss.sizeX = 300;
    setBossImg = topo3;
    nMeteore = 15;
    setupLevel3 = true;
  }
  background(sfondo);
  if(!abilitaPausa)
    setTimeout(setPausa, 200);
  if(bossHaAttaccato){
    generaOggettiMeteora();
    bossHaAttaccato = false;
  }
  
  getTyped();

  if(bossAttacca)
    clockAttacco();
  if(!ostBattleIsPlaying){
    ostBattle.play();
    ostBattleIsPlaying = true;
  }

  if(player.getSiMuove()){
    animazioneCammina();
    player.resetSpell();
  } else {
    setImgPlayerBase();
  }
  
  if(!bossAttacca){
    boss.attacca();
  }

  boss.laser();

  player.show();
  boss.show();


  // Chiamata ai metodi di movimento e visualizzazione del giocatore
  player.move();
  boss.deal();
  
  player.display();
  boss.display();

  if(escEPremuto && abilitaPausa){
    pausaMillis = millis();
    livello = 4;
  }
    
  fill(0, 0, 255);
  textFont(fontGioco);
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(40);
  text("Typed: ", 90, height - 10);
  text("Press ESC to pause the game", width * 7/9, height - 10);

  countdown();
  displayTimer();

  if(boss.hp <= 0){
    livello = 5;
  }
}

function item(){
  background(sfondo);

  player.show();
  boss.show();

  player.display();
  boss.display();

  fill(0, 0, 255);
  textFont(fontGioco);
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(40);
  text("Typed: ", 90, height - 10);
  text("Press ESC to pause the game", width * 7/9, height - 10);

  ostBattle.pause();
  ostBattleIsPlaying = false;

  clr();
  if(!preso1 && !preso2 && !preso3){
    image(schermataItem, width/2-495, height/2-270, 990, 540);
  } else if(preso1 && !preso2 && !preso3){
    image(schermataItem1, width/2-495, height/2-270, 990, 540);
  } else if(preso1 && preso2 && !preso3){
    image(schermataItem12, width/2-495, height/2-270, 990, 540);
  } else if(preso1 && preso2 && preso3){
    image(schermataItem123, width/2-495, height/2-270, 990, 540);
  } else if(preso1 && !preso2 && preso3){
    image(schermataItem13, width/2-495, height/2-270, 990, 540);
  } else if(!preso1 && preso2 && !preso3){
    image(schermataItem2, width/2-495, height/2-270, 990, 540);
  } else if(!preso1 && preso2 && preso3){
    image(schermataItem23, width/2-495, height/2-270, 990, 540);
  } else if(!preso1 && !preso2 && preso3){
    image(schermataItem3, width/2-495, height/2-270, 990, 540);
  }

  if(keyCode == 49){ //1
    if(!preso1){
      counter += 29;
      if(counter > 99){
        counter = 99;
      }
      player.setMaxHp(10);
      player.setHp(player.getMaxHp());
      preso1 = true;
      player.lastHitTime = millis() - (itemMillis - player.lastHitTime);
      if(setupLevel1)
        livello = 8;
      else if(setupLevel2)
        livello = 9;
      else if(setupLevel3)
        livello = 10;
    }
  }if(keyCode == 50){ //2
    if(!preso2){
      counter += 29;
      if(counter > 99){
        counter = 99;
      }
      boostDanno = 2;
      preso2 = true;
      player.lastHitTime = millis() - (itemMillis - player.lastHitTime);
      if(setupLevel1)
        livello = 8;
      else if(setupLevel2)
        livello = 9;
      else if(setupLevel3)
        livello = 10;
    }
  }if(keyCode == 51){ //3
    if(!preso3){
      counter += 29;
      if(counter > 99){
        counter = 99;
      }
      player.setSpeed(player.getSpeed()*1.5);
      preso3 = true;
      player.lastHitTime = millis() - (itemMillis - player.lastHitTime);
      if(setupLevel1)
        livello = 8;
      else if(setupLevel2)
        livello = 9;
      else if(setupLevel3)
        livello = 10;
    }
  }if(escEPremuto){
    abilitaPausa = false;
    player.lastHitTime = millis() - (itemMillis - player.lastHitTime);
    if(setupLevel1)
      livello = 8;
    else if(setupLevel2)
      livello = 9;
    else if(setupLevel3)
      livello = 10;
  }
}

// Funzione utile a ricevere le lettere scritte dall'utente mentre la battaglia è in corso
function getTyped(){
  if(!block)
    if(backspacePremuto) // Se si preme BACKSPACE cancella ciò che c'è scritto
      clr();
  // ATTACK
  if (player.a1_atk && player.t1_atk && player.t2_atk && player.a2_atk && player.c_atk && player.k_atk) {
    block = true;
    if(!successPlaying){
      success.play();
      boss.takeDamage();
      successPlaying = true;
    }
    if (t === 0) {
      t = millis();  // Inizia a conteggiare il tempo
    }
    let tempoPassato = millis() - t;
    if (tempoPassato > 1500) {
      clr();  // Chiamato solo dopo 1500 millisecondi (1.5 secondi)
      successPlaying = false;
      block = false;
    }
  } 
  
  // HEAL
  else if (player.h_hl && player.e_hl && player.a_hl && player.l_hl) {
    block = true;
    if(!successPlaying){
      success.play();
      successPlaying = true;
    }
    if(!curato && player.hp < player.maxHp){
      player.hp += 1;
      curato = true;
    }

    if (t === 0) {
      t = millis();  // Inizia a conteggiare il tempo
    }
    let tempoPassato = millis() - t;
    if (tempoPassato > 1500) {
      clr();  // Chiamato solo dopo 1500 millisecondi (1.5 secondi)
      curato = false;
      successPlaying = false;
      block = false;
    }
  }
  
  // ITEM
  else if (player.i_itm && player.t_itm && player.e_itm && player.m_itm) {
    block = true;
    if(!successPlaying){
      success.play();
      successPlaying = true;
    }
    
    successPlaying = false;
    block = false;
    itemMillis = millis();
    livello = 3;
  }
  
  // SPELL
  else if (player.s_spl && player.p_spl && player.e_spl && player.l1_spl && player.l2_spl) {
    block = true;
    if(!successPlaying){
      success.play();
      successPlaying = true;
    }
    player.setSpell();
    if (t === 0) {
      t = millis();  // Inizia a conteggiare il tempo
    }
    let tempoPassato = millis() - t;
    if (tempoPassato > 1500) {
      clr();  // Chiamato solo dopo 1500 millisecondi (1.5 secondi)
      successPlaying = false;
      block = false;
    }
  }
  
  else {
    t = 0;
  }
}

// Funzioni utili alla visualizzazione della camminata del player
function setImgPlayerBase(){
  if(right) player.setImg(posa1);
  if(left) player.setImg(posa2);
}

function animazioneCammina(){
   if(right) player.setImg(playerCorreDx);
   if(left) player.setImg(playerCorreSx);
}

function gameOver(){
  ostBattle.stop();
  background(gameOverImg);
  if(spacePremuto){
    resetAll();
    livello = 1;
  }
}

// Funzione che cancella tutto ciò che è stato digitato dall'utente
function clr(){
  player.a1_atk = false;
  player.t1_atk = false;
  player.t2_atk = false;
  player.a2_atk = false;
  player.c_atk = false;
  player.k_atk = false;
  
  player.h_hl = false;
  player.e_hl = false;
  player.a_hl = false;
  player.l_hl = false;

  player.i_itm = false;
  player.t_itm = false;
  player.e_itm = false;
  player.m_itm = false;

  player.s_spl = false;
  player.p_spl = false;
  player.e_spl = false;
  player.l1_spl = false;
  player.l2_spl = false;
}

// Funzione chiamata quando una tasto della tastiera viene premuto
function keyPressed() {
  // Verifica della direzione della freccia premuta
  if (keyCode === UP_ARROW) {
    upPremuto = true;
    player.keys.up = true;
  } else if (keyCode === DOWN_ARROW) {
    downPremuto = true;
    player.keys.down = true;
  } else if (keyCode === LEFT_ARROW) {
    player.keys.left = true;
  } else if (keyCode === RIGHT_ARROW) {
    player.keys.right = true;
  }
  
  if(keyCode == 27){
    escEPremuto = true;
  } if(keyCode == 32){
    spacePremuto = true;
  } if(keyCode == 8){
    backspacePremuto = true;
  }

  if (key.length === 1) { // Ignora i tasti funzionali
    if(!block){
      // ATTACK
      if ((key === "a" || key === "A") && !player.a1_atk && !player.t1_atk && !player.t2_atk && !player.a2_atk && !player.c_atk && !player.k_atk) {
      player.a1_atk = true;
      player.resetSpell();
      } else if (player.a1_atk && (key === "t" || key === "T") && !player.t1_atk && !player.t2_atk && !player.a2_atk && !player.c_atk && !player.k_atk) {
      player.t1_atk = true;
      } else if (player.a1_atk && player.t1_atk && (key === "t" || key === "T") && !player.t2_atk && !player.a2_atk && !player.c_atk && !player.k_atk) {
      player.t2_atk = true;
      } else if (player.a1_atk && player.t1_atk && player.t2_atk && (key === "a" || key === "A") && !player.a2_atk && !player.c_atk && !player.k_atk) {
      player.a2_atk = true;
      } else if (player.a1_atk && player.t1_atk && player.t2_atk && player.a2_atk && (key === "c" || key === "C") && !player.c_atk && !player.k_atk) {
      player.c_atk = true;
      } else if (player.a1_atk && player.t1_atk && player.t2_atk && player.a2_atk && player.c_atk &&(key === "k" || key === "K")) {
      player.k_atk = true;
      } else {
      // Resetta le variabili se l'utente digita qualcosa di diverso
      player.a1_atk = false;
      player.t1_atk = false;
      player.t2_atk = false;
      player.a2_atk = false;
      player.c_atk = false;
      player.k_atk = false;
      }

      // HEAL
      if ((key === "h" || key === "H") && !player.h_hl && !player.e_hl && !player.a_hl && !player.l_hl) {
      player.h_hl = true;
      player.resetSpell();
      } else if (player.h_hl && (key === "e" || key === "E") && !player.e_hl && !player.a_hl && !player.l_hl) {
      player.e_hl = true;
      } else if (player.h_hl && player.e_hl && (key === "a" || key === "A") && !player.a_hl && !player.l_hl) {
      player.a_hl = true;
      } else if (player.h_hl && player.e_hl && player.a_hl && (key === "l" || key === "L") && !player.l_hl) {
      player.l_hl = true;
      } else {
      // Resetta le variabili se l'utente digita qualcosa di diverso
      player.h_hl = false;
      player.e_hl = false;
      player.a_hl = false;
      player.l_hl = false;
      }

      // ITEM
      if ((key === "i" || key === "I") && (player.keys.up || player.keys.down || player.keys.left || player.keys.right || !player.keys.up || !player.keys.down || !player.keys.left || !player.keys.right) && !player.i_itm && !player.t_itm && !player.e_itm && !player.m_itm) {
      player.i_itm = true;
      player.resetSpell();
      } else if (player.i_itm && (key === "t" || key === "T") && !player.t_itm && !player.e_itm && !player.m_itm) {
      player.t_itm = true;
      } else if (player.i_itm && player.t_itm && (key === "e" || key === "E") && !player.e_itm && !player.m_itm) {
      player.e_itm = true;
      } else if (player.i_itm && player.t_itm && player.e_itm && (key === "m" || key === "M") && !player.m_itm) {
      player.m_itm = true;
      } else {
      // Resetta le variabili se l'utente digita qualcosa di diverso
      player.i_itm = false;
      player.t_itm = false;
      player.e_itm = false;
      player.m_itm = false;
      }

      // SPELL
      if ((key === "s" || key === "S") && !player.s_spl && !player.p_spl && !player.e_spl && !player.l1_spl && !player.l2_spl) {
      player.s_spl = true;
      } else if (player.s_spl && (key === "p" || key === "P") && !player.p_spl && !player.e_spl && !player.l1_spl && !player.l2_spl) {
      player.p_spl = true;
      } else if (player.s_spl && player.p_spl && (key === "e" || key === "E") && !player.e_spl && !player.l1_spl && !player.l2_spl) {
      player.e_spl = true;
      } else if (player.s_spl && player.p_spl && player.e_spl && (key === "l" || key === "L") && !player.l1_spl && !player.l2_spl) {
      player.l1_spl = true;
      } else if (player.s_spl && player.p_spl && player.e_spl && player.l1_spl && (key === "l" || key === "L") && !player.l2_spl) {
      player.l2_spl = true;
      } else {
      // Resetta le variabili se l'utente digita qualcosa di diverso
      player.s_spl = false;
      player.p_spl = false;
      player.e_spl = false;
      player.l1_spl = false;
      player.l2_spl = false;
      }
    }
  }
}

// Funzione chiamata quando un tasto della tastiera viene rilasciato
function keyReleased() {
  if (keyCode === UP_ARROW) {
    upPremuto = false;
    player.keys.up = false;
  } else if (keyCode === DOWN_ARROW) {
    downPremuto = false;
    player.keys.down = false;
  } else if (keyCode === LEFT_ARROW) {
    player.keys.left = false;
  } else if (keyCode === RIGHT_ARROW) {
    player.keys.right = false;
  }
  
  if(keyCode == 27){
    escEPremuto = false;
  } if(keyCode == 32){
    spacePremuto = false;
  } if(keyCode == 8){
    backspacePremuto = false;
  }
}

// Funzione che genera gli oggetti delle meteore
function generaOggettiMeteora(){
  for(let i = 0; i < nMeteore; i++)
    meteore.push(new Meteora());
}

// Funzione che regola l'intervallo di tempo tra un attacco e l'altro
function clockAttacco(){
  setTimeout(() => {
    bossAttacca = false;
  }, 500);
}

function pausa(){
  background(pausaImg);
  ostBattle.pause();
  ostBattleIsPlaying = false;
  if(spacePremuto){
    ostBattle.play();
    ostBattleIsPlaying = true;
    player.lastHitTime = millis() - (pausaMillis - player.lastHitTime);
    if(setupLevel1)
      livello = 8;
    else if(setupLevel2)
      livello = 9;
    else if(setupLevel3)
      livello = 10;
  }

  if(backspacePremuto){
    ostBattle.stop();
    resetAll();
    livello = 0;
  }
}

// Funzione che regola quando è possibile mettere in pausa
function setPausa(){
  if(escEPremuto)
    abilitaPausa = true;
}

// Funzione che non permette al programma di leggere altri input se è già stato premuta la freccia verso l'alto o verso il basso
function controllaHomeBlock(){
  if(downPremuto || upPremuto){
    homeBlock = true;
  }
}

function youWin(){
  ostBattle.stop();
  background(youWinImg);

  textFont(fontGioco);
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(80);
  text(counter, width * 1.2/4, height * 35/36);

  if(escEPremuto){
    resetAll();
    livello = 0;
  }
}

function tutorial(){
  background(tutorialImg);
  if(escEPremuto){
    resetAll();
    livello = 0;
  }
}

function credits(){
  background(creditsImg);
  if(escEPremuto){
    resetAll();
    livello = 0;
  }
}

// Funzione utile al conteggio del tempo impiegato
function countdown(){
  if(!timerCountdown)
      timerCountdown = millis();
  if(millis() - timerCountdown >= 1000){
      timerCountdown = 0;
      if(counter < 99)
        counter++;
  }
}

// Funzione utile alla stampa del tempo
function displayTimer(){
  textFont(fontGioco);
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(40);
  text(counter, width / 50, height / 8);
}
