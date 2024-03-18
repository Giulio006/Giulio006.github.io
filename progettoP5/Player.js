// Definizione della classe Player
class Player {
  constructor(x, y, sizeX, sizeY) {
    // Posizione e dimensioni iniziali del giocatore
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    // Velocità del giocatore
    this.speed = 7;

    this.hp = 5; // Punti vita
    // Oggetto per memorizzare lo stato delle frecce premute
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    this.siMuove = false;

    // Invulnerabilità del personaggio
    this.inv = false;
    this.lastHitTime = 0;

    this.spell = false;
    this.maxHp = 5;

    // Variabili per tracciare lo stato di completamento delle azioni
    this.h_hl = false;
    this.e_hl = false;
    this.a_hl = false;
    this.l_hl = false;

    this.a1_atk = false;
    this.t1_atk = false;
    this.t2_atk = false;
    this.a2_atk = false;
    this.c_atk = false;
    this.k_atk = false;

    this.i_itm = false;
    this.t_itm = false;
    this.e_itm = false;
    this.m_itm = false;

    this.s_spl = false;
    this.p_spl = false;
    this.e_spl = false;
    this.l1_spl = false;
    this.l2_spl = false;
    
  }

  // Metodi get e set
  getHp(){
    return this.hp;
  }

  setHp(hp){
    this.hp = hp;
  }

  getSpeed(){
    return this.speed;
  }
  
  setSpeed(sp){
    this.speed = sp;
  }

  setImg(img){
    set = img;
  }

  resetImg(){
    set = posa1;
  }
  
  getImg(){
    return set;
  }

  setMaxHp(hp){
    this.maxHp = hp;
  }

  getMaxHp(){
    return this.maxHp;
  }

  setSpell(){
    this.spell = true;
  }

  resetSpell(){
    this.spell = false;
  }

  getSpell(){
    return this.spell;
  }

  getSiMuove(){
    return this.siMuove;
  }

  // Metodo per gestire il movimento del giocatore
  move() {
    let xDir = 0;
    let yDir = 0;
  
    if (this.keys.up) {
      this.siMuove = true;
      yDir -= 1;
    }
    if (this.keys.down) {
      this.siMuove = true;
      yDir += 1;
    }
    if (this.keys.left) {
      this.siMuove = true;
      left = true;
      right = false;
      xDir -= 1;
    }
    if (this.keys.right) {
      this.siMuove = true;
      right = true;
      left = false;
      xDir += 1;
    }
  
    if (!this.keys.up && !this.keys.down && !this.keys.left && !this.keys.right) {
      this.siMuove = false;
    }
  
    var newX = this.x + xDir * this.speed;
    var newY = this.y + yDir * this.speed;
  
    if (
      newX - this.sizeX / 2 > 0 &&
      newX + this.sizeX / 2 < width &&
      newY - this.sizeY / 2 > 0 &&
      newY + this.sizeY / 2 < height
    ) {

      // Verifica se il nuovo punto si sovrappone al boss o se il giocatore esce dai bordi dello schermo
      if (
        newX - this.sizeX / 2 > boss.bossRight - 10 ||
        newX + this.sizeX / 2 < boss.bossLeft + 10 ||
        newY - this.sizeY / 2 > boss.bossBottom - 10 ||
        newY + this.sizeY / 2 < boss.bossTop + 10
      ) {
        this.x = newX;
        this.y = newY;
      }
    }
  }

  show(){
    image(set, this.x - this.sizeX / 2, this.y - this.sizeY / 2, this.sizeX, this.sizeY);
  }

  display() {
    for(let j = 0; j < this.maxHp; j++){
      image(cuorePerso, j*45, 0, 50, 50);
    }
    // Visualizzazione punti vita
    for(let i = 0; i < this.hp; i++){
      image(cuore, i*45, 0, 50, 50);
    }

    if(this.inv){
      this.inv = false;
    }

    if(this.hp <= 0){
      livello = 2;
    }
    fill(0, 0, 255);
    textFont(fontGioco);
    fill(255);
    stroke(0);
    strokeWeight(2);
    textSize(40);

    // Stampa dei comandi:
    // ATTACK
    if(this.a1_atk && !this.h_hl)
      text('A', 180, height - 10);
    if(this.t1_atk)
      text('T', 210, height - 10);
    if(this.t2_atk)
      text('T', 240, height - 10);
    if(this.a2_atk)
      text('A', 270, height - 10);
    if(this.c_atk)
      text('C', 300, height - 10);
    if(this.k_atk)
      text('K', 330, height - 10);

    // HEAL
    if(this.h_hl)
      text('H', 180, height - 10);
    if(this.e_hl)
      text('E', 210, height - 10);
    if(this.a_hl)
      text('A', 240, height - 10);
    if(this.l_hl)
      text('L', 270, height - 10);

    // ITEM
    if(this.i_itm)
      text('I', 180, height - 10);
    if(this.t_itm)
      text('T', 210, height - 10);
    if(this.e_itm)
      text('E', 240, height - 10);
    if(this.m_itm)
      text('M', 275, height - 10);

    // SPELL
    if(this.s_spl)
      text('S', 180, height - 10);
    if(this.p_spl)
      text('P', 210, height - 10);
    if(this.e_spl)
      text('E', 240, height - 10);
    if(this.l1_spl)
      text('L', 270, height - 10);
    if(this.l2_spl)
      text('L', 300, height - 10);
  }
}