// Definizione della classe Boss
class Boss {
  constructor(x, y, sizeY){
    // Posizione e dimensioni iniziali del boss
    this.x = x;
    this.y = y;
    this.sizeY = sizeY;

    // Posizione X e Y dei laser
    this.laserX = 0;
    this.laserY = 0;

    // Direzione dei laser
    this.laserGiu = true;
    this.laserSu = false;
  }

  show(){
    image(setBossImg, this.x - this.sizeX / 2, this.y - this.sizeY / 2, this.sizeX, this.sizeY);
  }

  // Funzione utile a far attaccare il boss
  attacca(){
    generaOggettiMeteora();
    this.attaccaMeteore();
  }

  // Attacco con le meteore
  attaccaMeteore(){
    if(!ombraBlock){
      for(let i = 0; i < nMeteore; i++){
        meteore[i].generaMeteoraOmbra();
      }
    }

    setTimeout(() => {
      for(let i = 0; i < nMeteore; i++){
        meteore[i].generaMeteora();
      }
    }, 450);
    
    for(let i = 0; i < nMeteore; i++){
      meteore[i].meteoraCade();
      meteore[i].generaMeteora();
    }

    if(meteoraFerma){
      if(tMeteora == 0)
        tMeteora = millis();
      let tempoPassatoMeteora = millis() - tMeteora;
      if(tempoPassatoMeteora >= 1000){
        meteore.splice(0, nMeteore);
        tMeteora = 0;
        meteoraFerma = false;
        ombraBlock = false;
        bossAttacca = true;
        bossHaAttaccato = true;
      }
    }
  }
  
  // Visualizzazione HP del boss
  display(){
    let cont = width
    for(let i = 0; i <= this.maxHp; i++, cont -= 45){
      image(cuoreNemicoPerso, cont, 0, 50, 50);
    }
    let cont1 = width
    for(let i = 0; i <= this.hp; i++, cont1 -= 45){
      image(cuoreNemico, cont1, 0, 50, 50);
    }
  }

  takeDamage(){
    this.hp = this.hp - boostDanno;
  }

  // Funzione che sottrae HP al giocatore
  deal() {
    this.bossLeft = this.x - this.sizeX / 2;
    this.bossRight = this.x + this.sizeX / 2;
    this.bossTop = this.y - this.sizeY / 2;
    this.bossBottom = this.y + this.sizeY / 2;
    // Calcolo dei margini del giocatore
    let playerLeft = player.x - player.sizeX / 2;
    let playerRight = player.x + player.sizeX / 2;
    let playerTop = player.y - player.sizeY / 2;
    let playerBottom = player.y + player.sizeY / 2;

    let laserLeft = this.laserY;
    let laserRight = this.laserY + 60;

    let laserLeft2 = this.laserY + width / 2 + 60;
    let laserRight2 = this.laserY + width / 2 + 120;

    let laserTop = this.laserY;
    let laserBottom = this.laserY + 60;

    if(setupLevel3){
      if (playerBottom > laserTop && playerTop < laserBottom || playerRight > laserLeft && playerLeft < laserRight || playerRight > laserLeft2 && playerLeft < laserRight2){
        if (millis() - player.lastHitTime > 2000) {
          if (!player.inv && !player.getSpell()) {
            player.setHp(player.getHp()-2);
            danno.play();
            player.inv = true;
            player.lastHitTime = millis();
          }
        }
      }
    }

    if (
      playerRight > this.bossLeft &&
      playerLeft < this.bossRight &&
      playerBottom > this.bossTop &&
      playerTop < this.bossBottom
    ) {
      if (millis() - player.lastHitTime > 2000) {
        if (!player.inv && !player.getSpell()) {
          player.setHp(player.getHp()-1);
          danno.play();
          player.inv = true;
          player.lastHitTime = millis();
        }
      }
    }
  }

  // Visualizzazione laser
  laser(){
    image(laser, this.laserX, this.laserY, width, 60);
    image(laserVerticale, this.laserY, this.laserX, 60, height);
    image(laserVerticale, this.laserY + width / 2 + 60, this.laserX, 60, height);
    if(this.laserY > height - 60){
      this.laserGiu = false;
      this.laserSu = true;
    }
    if(this.laserY < 0){
      this.laserGiu = true;
      this.laserSu = false;
    }

    if(this.laserGiu){
      this.laserY++;
    }
    else if(this.laserSu){
      this.laserY--;
    }
  }
}