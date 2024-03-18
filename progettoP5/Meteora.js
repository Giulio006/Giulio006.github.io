//Definizione classe Meteora
class Meteora{
    constructor(){
        this.setImg(meteora);

        // Settaggio degli attributi utili alla generazione e alla visualizzazione delle meteore
        this.ombraX = int(random(0, width - 100));
        this.ombraY = int(random(0, height - 100));

        this.sizeXOmbra = 100;
        this.sizeYOmbra = 70;

        this.sizeXMeteora = 100;
        this.sizeYMeteora = 150;

        this.check = false;

        this.ombraLeft = this.ombraX;
        this.ombraRight = this.ombraX + this.sizeXOmbra;
        this.ombraTop = this.ombraY;
        this.ombraBottom = this.ombraY + this.sizeYOmbra;

        this.my = this.ombraY - 800;
        this.mx = this.ombraX;

        this.attivaMeteora = false;

        while (
            this.ombraRight > boss.bossLeft &&
            this.ombraLeft < boss.bossRight &&
            this.ombraBottom > boss.bossTop &&
            this.ombraTop < boss.bossBottom
          )
          {
            this.ombraX = int(random(0, width - 100));
            this.ombraY = int(random(0, height - 100));
      
            this.ombraLeft = this.ombraX - 50;
            this.ombraRight = this.ombraX + 50;
            this.ombraTop = this.ombraY - 35;
            this.ombraBottom = this.ombraY + 35;

            this.my = this.ombraY - 800;
            this.mx = this.ombraX;
        }
    }

    // Definizione dei metodi utili alla generazione e alla visualizzazione delle meteore
    setImg(img){
        setMeteora = img;
    }

    setAttivaMeteora(){
        this.attivaMeteora = true;
    }

    generaMeteoraOmbra(){
        image(meteoraOmbra, this.ombraX, this.ombraY, this.sizeXOmbra, this.sizeYOmbra);
      }
    
    generaMeteora(){
        image(setMeteora, this.mx, this.my, this.sizeXMeteora, this.sizeYMeteora);
    }

    meteoraCade(){
        if(this.my < this.ombraY - 80)
            this.my += 10;
        else if(this.my >= this.ombraY - 80){
            ombraBlock = true;
            this.my = this.ombraY - 45;
            this.mx = this.ombraX - 25;
            this.setImg(esplosione);
            if(!this.check){
                this.sizeXMeteora = 150;
                this.sizeYMeteora = 150;
                this.check = true;
            }
            this.danneggia();
            meteoraFerma = true;
        }
    }

    danneggia(){
        let playerLeftM = player.x - player.sizeX / 2;
        let playerRightM = player.x + player.sizeX / 2;
        let playerTopM = player.y - player.sizeY / 2;
        let playerBottomM = player.y + player.sizeY / 2;

        let meteoraLeft = this.mx;
        let meteoraRight = this.mx + this.sizeXMeteora;
        let meteoraTop = this.my;
        let meteoraBottom = this.my + this.sizeYMeteora;

        if (
            playerRightM > meteoraLeft &&
            playerLeftM < meteoraRight &&
            playerBottomM > meteoraTop &&
            playerTopM < meteoraBottom
          ){
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

    reset(){
        this.sizeXMeteora = 0;
        this.sizeYMeteora = 0;
    }
}