let canva1 = document.getElementById("canva1");
let ctx = canva1.getContext("2d");

class Telas {
    constructor(url_img, x, y, width, height) {
        this.img = new Image();
        this.url_img = url_img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    desenhe(){
        this.img.onload = () => {
            ctx.beginPath();
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            ctx.closePath();
        }
        this.img.src = this.url_img;
    }
}

let tela_1 = new Telas('Imagens/praia.jpeg', 0, 0, 1000, 600);
tela_1.desenhe();