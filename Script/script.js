let canva1 = document.getElementById("canva1");
let ctx = canva1.getContext("2d");

class telas {
    constructor(url_img, x, y, width, heigh) {
        this.img = new Image();
        this.url_img = url_img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.heigh = heigh;
    }
    desenhe(){
        this.img.src = this.url_img;
        ctx.beginPath();
        ctx.drawImage(this.x, this.y, this.width, this.heigh);
        ctx.closePath();
    }
}

let tela_1 = new telas('../Imagens/praia.jpeg', 0, 0, 1000, 600);
tela_1.desenhe();