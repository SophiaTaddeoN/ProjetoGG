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
        this.carregada = false;
        this.img.onload = () => {
            this.carregada = true;
        };
        this.img.src = this.url_img;
    }
    desenhe(){
        if (this.carregada) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}

class Objetos {
    constructor(url_img, x, y, width, height) {
        this.img = new Image();
        this.url_img = url_img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.carregada = false;
        this.img.onload = () => {
            this.carregada = true;
        };
        this.img.src = this.url_img;
    }
    desenhe(){
        if (this.carregada) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}

let tela_1 = new Telas('Imagens/praia.jpeg', 0, 0, 1000, 600);
let tela_2 = new Telas('Imagens/fundo-cabana.jpeg', 0, 0, 1000, 600);

let bancada_cozinha2 = new Objetos('Imagens/bancada-cozinha2.png', 900, 120, 100, 160);
let fogao = new Objetos('Imagens/fogao.png', 802, 120, 100, 110)
let bancada_cozinha1 = new Objetos('Imagens/bancada-cozinha1.png', 553, 120, 250, 160);
let geladeira = new Objetos('Imagens/geladeira.png', 458, 80, 100, 150)
let cama = new Objetos('Imagens/cama.png', 40, 90, 170, 228)
let tapete = new Objetos('Imagens/tapete.png', 670, 250, 148, 99)
let planta = new Objetos('Imagens/planta.png', 925, 230, 78, 113)
let florzinha = new Objetos('Imagens/florzinha.png', 500, 300, 43, 74)


function animation(){
    ctx.clearRect(0,0,canva1.width, canva1.height);
    tela_2.desenhe();
    bancada_cozinha2.desenhe();
    bancada_cozinha1.desenhe();
    fogao.desenhe();
    geladeira.desenhe();
    tapete.desenhe();
    planta.desenhe();

    florzinha.desenhe();

    requestAnimationFrame(animation)
}

animation();

document.addEventListener('keydown', function(evento){
    let tecla = evento.key;
    console.log(tecla);

    let velocidade = 4;

    let novaX = florzinha.x;
    let novaY = florzinha.y;

    if(tecla == 'W' || tecla =='w'){novaY -= velocidade};
    if(tecla == 'S' || tecla =='s'){novaY += velocidade};
    if(tecla == 'A' || tecla =='a'){novaX -= velocidade};
    if(tecla == 'D' || tecla =='d'){novaX += velocidade};

    novaX = Math.max(0, Math.min(novaX, canva1.width - florzinha.width));
    novaY = Math.max(0, Math.min(novaY, canva1.height - florzinha.height));

    florzinha.x = novaX;
    florzinha.y = novaY;
})

