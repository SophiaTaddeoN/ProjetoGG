let musica = document.getElementById('musica');
let canva1 = document.getElementById("canva1");
let ctx = canva1.getContext("2d");

function IniciaJogo() {
    document.getElementById("tela").style.display = "block";
    musica.play();
    musica.loop = true;
    
}

function AcabaMusica() {
    musica.pause();
}

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

class PersonagemAnimado {
    constructor(sprites, x, y, width, height) {
        this.sprites = sprites; // {direcao: [img1, img2, img3]}
        this.direcao = 'frente';
        this.frames = this.sprites[this.direcao];
        this.frameIndex = 0;
        this.contador = 0;
        this.delay = 5; // controla a velocidade da animação

        this.img = new Image();
        this.img.src = this.frames[this.frameIndex];
        this.carregada = false;
        this.img.onload = () => {
            this.carregada = true;
        };

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    mudarDirecao(novaDirecao) {
        if (this.direcao !== novaDirecao) {
            this.direcao = novaDirecao;
            this.frames = this.sprites[this.direcao];
            this.frameIndex = 0;
        }
    }

    atualizarFrame() {
        this.contador++;
        if (this.contador >= this.delay) {
            this.contador = 0;
            this.frameIndex = (this.frameIndex + 1) % this.frames.length;
            this.img.src = this.frames[this.frameIndex];
        }
    }

    desenhe() {
        if (this.carregada) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}

let bancada_cozinha2 = new Objetos('Imagens/bancada-cozinha2.png', 900, 120, 100, 160);
let fogao = new Objetos('Imagens/fogao.png', 802, 120, 100, 110);
let bancada_cozinha1 = new Objetos('Imagens/bancada-cozinha1.png', 553, 120, 250, 160);
let geladeira = new Objetos('Imagens/geladeira.png', 458, 80, 100, 150);
let cama = new Objetos('Imagens/cama.png', 40, 90, 170, 228);
let tapete = new Objetos('Imagens/tapete.png', 670, 250, 148, 99);
let planta = new Objetos('Imagens/planta.png', 925, 230, 78, 113);
let florzinha = new Objetos('Imagens/florzinha.png', 500, 300, 43, 74);
let cadeira_jantar_frente1 = new Objetos('Imagens/cadeira_jantar_frente.png', 655, 335, 70, 130);
let cadeira_jantar_frente2 = new Objetos('Imagens/cadeira_jantar_frente.png', 755, 335, 70, 130);
let cadeira_jantar_esquerda = new Objetos('Imagens/cadeira_jantar_esquerda.png', 607, 360, 70, 130);
let cadeira_jantar_direita = new Objetos('Imagens/cadeira_jantar_direita.png', 808, 360, 70, 130);
let mesa_jantar = new Objetos('Imagens/mesa_jantar.png', 617, 375, 240, 140);
let cadeira_jantar_atras1 = new Objetos('Imagens/cadeira_jantar_atras.png', 655, 435, 70, 130);
let cadeira_jantar_atras2 = new Objetos('Imagens/cadeira_jantar_atras.png', 755, 435, 70, 130);

let orion = new PersonagemAnimado({
    frente: ['Imagens/orion_frente1.png', 'Imagens/orion_frente2.png', 'Imagens/orion_frente3.png'],
    costas: ['Imagens/orion_costas1.png', 'Imagens/orion_costas2.png', 'Imagens/orion_costas3.png'],
    esquerda: ['Imagens/orion_esquerda1.png', 'Imagens/orion_esquerda2.png', 'Imagens/orion_esquerda3.png'],
    direita: ['Imagens/orion_direita1.png', 'Imagens/orion_direita2.png', 'Imagens/orion_direita3.png']
}, 500, 300, 43, 74);

let tela_1 = {
    tela: new Telas('Imagens/praia.jpeg', 0, 0, 1000, 600),}
let tela_2 = {
    tela: new Telas('Imagens/fundo-cabana.jpeg', 0, 0, 1000, 600),
    
    cenario_tras: [bancada_cozinha2, bancada_cozinha1, fogao, geladeira, planta],

    cenario_baixo: tapete,
    
    cenario_frente: [cadeira_jantar_frente1, cadeira_jantar_frente2, cadeira_jantar_esquerda, cadeira_jantar_direita, mesa_jantar, cadeira_jantar_atras1, cadeira_jantar_atras2],

    desenhe: function() {
        this.tela.desenhe();

        // desenha o fundo e objetos de trás
        this.cenario_tras.forEach(obj => obj.desenhe());

        // desenha a florzinha
        orion.desenhe();

        this.cenario_baixo(obj => obj.desenhe());

        // desenha os objetos da frente
        this.cenario_frente.forEach(obj => obj.desenhe());
    } 
}

function animation(tela){
    ctx.clearRect(0,0,canva1.width, canva1.height);
    tela.desenhe();
    requestAnimationFrame(() => animation(tela));
}

animation(tela_2);

document.addEventListener('keydown', function(evento){
    let tecla = evento.key;
    console.log(tecla);

    let velocidade = 4;

    let novaX = orion.x;
    let novaY = orion.y;

    if(tecla == 'W' || tecla =='w'){novaY -= velocidade; orion.mudarDirecao('costas')};
    if(tecla == 'S' || tecla =='s'){novaY += velocidade; orion.mudarDirecao('frente')};
    if(tecla == 'A' || tecla =='a'){novaX -= velocidade; orion.mudarDirecao('esquerda')};
    if(tecla == 'D' || tecla =='d'){novaX += velocidade; orion.mudarDirecao('direita')};

    novaX = Math.max(0, Math.min(novaX, canva1.width - orion.width));
    novaY = Math.max(0, Math.min(novaY, canva1.height - orion.height));
    orion.x = novaX;
    orion.y = novaY;

    if(orion.x + orion.width <= (((cenario_tras.x + cenario_tras.width) + cenario_tras.height)/2)) {
        orion.x
    }
    orion.atualizarFrame();
    
})
