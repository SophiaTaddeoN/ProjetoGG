let musica = document.getElementById("musica");
let musica2 = document.getElementById("musica2");
let canva1 = document.getElementById("canva1");
let ctx = canva1.getContext("2d");
let jaColidiu = false;
// let contador = 0;

let mostrarRetangulo = false;
let mostrarTexto = false;
let mostrarCirculo = false;
let mostraLinha = false;
let mostraImagem = false;

let tempoRetangulo = 0;
let tempotexto = 0;
let tempoImagem = 0;

let senhaDigitada = "";
let digitandoSenha = false;
let podeDigitar = true;
let senhaErrada = ""; // Variável para armazenar a senha errada
let tempoErro = 0;     // Armazena quando ocorreu o erro

function IniciaJogo() {
  document.getElementById("tela").style.display = "block";
  musica.play();
  musica.loop = true;
}

function AcabaMusica() {
  musica.pause();
  musica2.pause();
}

function Retangulo(n, cor, cor_b, x, y, zx, zy) {
  ctx.beginPath();
  ctx.lineWidth = n;
  ctx.fillStyle = cor;
  ctx.strokeStyle = cor_b;
  ctx.fillRect(x, y, zx, zy);
  ctx.strokeRect(x, y, zx, zy);
  ctx.closePath();
}

function arco(n, color, color_b, x, y, z, rad1, rad2){
  ctx.beginPath();
  ctx.lineWidth = n;
  ctx.fillStyle = color;
  ctx.strokeStyle = color_b;
  ctx.arc(x,y,z,rad1*Math.PI,rad2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function texto( n, color, tama_font, posicao, text, x, y) {  
  ctx.beginPath();
  ctx.lineWidth = n;
  ctx.fillStyle = color;
  ctx.font = tama_font;
  ctx.textAlign = posicao;
  ctx.fillText(text , x, y);
  ctx.fill();
  ctx.closePath();
}

function linha(n, color, color_b, x0, y0, x1, y1) {
  ctx.beginPath();
  ctx.lineWidth = n;
  ctx.fillStyle = color;
  ctx.strokeStyle = color_b;
  ctx.moveTo(x0,y0);
  ctx.lineTo(x1,y1);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
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
  desenhe() {
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
  desenhe() {
    if (this.carregada) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
}

class PersonagemAnimado {
  constructor(sprites, x, y, frontWidth, frontHeight, sideWidth, sideHeight) {
    this.sprites = sprites;
    this.direcao = "frente";
    this.frames = this.sprites[this.direcao];
    this.frameIndex = 0;
    this.contador = 0;
    this.delay = 5;

    // Dimensões diferentes para frente/costas vs laterais
    this.frontWidth = frontWidth;
    this.frontHeight = frontHeight;
    this.sideWidth = sideWidth;
    this.sideHeight = sideHeight;
    
    // Dimensões atuais (serão atualizadas conforme a direção)
    this.width = frontWidth;
    this.height = frontHeight;

    this.img = new Image();
    this.img.src = this.frames[this.frameIndex];
    this.carregada = false;
    this.img.onload = () => {
      this.carregada = true;
    };

    this.x = x;
    this.y = y;
  }

  mudarDirecao(novaDirecao) {
    if (this.direcao !== novaDirecao) {
      this.direcao = novaDirecao;
      this.frames = this.sprites[this.direcao];
      this.frameIndex = 0;
      
      // Atualiza as dimensões conforme a direção
      if (novaDirecao === "esquerda" || novaDirecao === "direita") {
        this.width = this.sideWidth;
        this.height = this.sideHeight;
      } else {
        this.width = this.frontWidth;
        this.height = this.frontHeight;
      }
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

const bancada_cozinha2 = new Objetos("Imagens/bancada-cozinha2.png", 900, 120, 100, 160);
const fogao = new Objetos("Imagens/fogao.png", 802, 120, 100, 110);
const bancada_cozinha1 = new Objetos("Imagens/bancada-cozinha1.png", 553, 120, 250, 109);
const geladeira = new Objetos("Imagens/geladeira.png", 458, 80, 100, 150);
const tapete = new Objetos("Imagens/tapete.png", 670, 250, 148, 99);
const planta = new Objetos("Imagens/planta.png", 925, 230, 78, 113);
const florzinha = new Objetos("Imagens/florzinha.png", 720, 366, 43, 74);
const cadeira_jantar_frente1 = new Objetos("Imagens/cadeira_jantar_frente.png", 655, 335, 70, 130);
const cadeira_jantar_frente2 = new Objetos("Imagens/cadeira_jantar_frente.png", 755, 335, 70, 130);
const cadeira_jantar_esquerda = new Objetos("Imagens/cadeira_jantar_esquerda.png", 607, 360, 70, 130);
const cadeira_jantar_direita = new Objetos("Imagens/cadeira_jantar_direita.png", 808, 360, 70, 130);
const mesa_jantar = new Objetos("Imagens/mesa_jantar.png", 632, 390, 220, 130);
const cadeira_jantar_atras1 = new Objetos("Imagens/cadeira_jantar_atras.png", 655, 435, 70, 130);
const cadeira_jantar_atras2 = new Objetos("Imagens/cadeira_jantar_atras.png", 755, 435, 70, 130);
const tapete_da_sala = new Objetos("Imagens/tapete_sala.png", 100, 340, 200, 200);
const sofa = new Objetos("Imagens/sofa_CERTO.png", 100, 460, 206, 140);
const sofa_lado2 = new Objetos("Imagens/sofa_lado.png", 10, 400, 100, 130);
const sofa_lado1 = new Objetos("Imagens/sofa_lado.png", 10, 310, 100, 130);
const porta1 = new Objetos("Imagens/porta.jfif", 340, 43, 80, 120);
const cadeado_fechado = new Objetos("Imagens/cadeado_fechado.png", 395, 100, 20, 20);
const relogio = new Objetos("Imagens/relogio.png", 245, 43, 80, 160);
const porta2 = new Objetos("Imagens/porta2.jfif", 150, 43, 80, 120);
const mesa_tv = new Objetos("Imagens/mesa_tv.png", 155, 300, 100, 75);
const televisao = new Objetos("Imagens/tv.png", 160, 243, 90, 80);
const mesinha = new Objetos("Imagens/mesinha.png", 315, 500, 70, 70);
const livros = new Objetos("Imagens/livros.png", 335, 495, 35, 35);
const estante = new Objetos("Imagens/estante.png", 10, 43, 100, 150);
const quadro = new Objetos("Imagens/quadro.png", 660, 50, 60, 40);
const porta_cabana = new Objetos("Imagens/porta.jfif", 265, 282.5, 54, 80);
const bau = new Objetos("Imagens/bau.png", 450, 100, 100, 72);
const flotoGeladeira = new Objetos('Imagens/foto_geladeira.png', 250, 50, 500, 500);
const flotoCorpo = new Objetos('Imagens/foto_corpo.png', 250, 50, 500, 500);
const cadeado = new Objetos("Imagens/cadeado_fechado.png", 250, 50, 500, 500);

let orion = new PersonagemAnimado(
  {
    frente: [
      "Imagens/orion_frente1.png",
      "Imagens/orion_frente2.png",
      "Imagens/orion_frente3.png",
    ],
    costas: [
      "Imagens/orion_costas1.png",
      "Imagens/orion_costas2.png",
      "Imagens/orion_costas3.png",
    ],
    esquerda: [
      "Imagens/orion_esquerda1.png",
      "Imagens/orion_esquerda2.png",
      "Imagens/orion_esquerda3.png",
    ],
    direita: [
      "Imagens/orion_direita1.png",
      "Imagens/orion_direita2.png",
      "Imagens/orion_direita3.png",
    ],
  },
  500, // x inicial
  300, // y inicial
  53,  // largura frontal
  74,  // altura frontal
  43,  // largura lateral (ajuste conforme necessário)
  74   // altura lateral (pode ser a mesma ou diferente)
);

let telaAtual = null;

function animation(tela) {
  telaAtual = tela;
  ctx.clearRect(0, 0, canva1.width, canva1.height);
  tela.desenhe();

  // Desenha o retângulo (se estiver ativo e na tela_1)
  if (mostrarRetangulo && mostrarTexto && telaAtual === tela_1 && ColisaoTrocadeTela_Tela1ToTela2() == true) {
    Retangulo(2, 'black', 'white', 20, 400, 960, 180);
    texto(10,'white', '25px Gloria Hallelujah', 'left', '“Orion…”, essa voz lhe parece familiar. Você tenta achar a origem e conclui ', 40, 440);
    texto(10, 'white','25px Gloria Hallelujah', 'left', 'que veio da cabana. Embora você saiba que é burrice entrar em uma ', 40, 475);
    texto(10, 'white','25px Gloria Hallelujah', 'left', 'cabana desconhecida onde vozes saem de dentro, você ignora. Algo no seu ', 40, 505);
    texto(10, 'white','25px Gloria Hallelujah', 'left', 'interior diz que você TEM que entrar. Você entra', 40, 540);
    // Verifica se já passaram 10 segundos
    if (Date.now() >= tempoRetangulo && tempotexto) {
      mostrarRetangulo = false; // Esconde o retângulo
      mostrarTexto = false;
      jaColidiu = false; // Libera para colidir novamente no futuro
      telaAtual = tela_2 // Muda para a tela_2
      ctx.clearRect(0, 0, canva1.width, canva1.height); // Limpa o canvas
      tela_2.desenhe(); // Desenha a tela_2
      orion.x = 478.5; // Posição inicial na cabana
      orion.y = 500;
    }
  }
  if (mostrarCirculo && mostrarTexto && mostraLinha && telaAtual === tela_2) {
    arco(5, '#ceaa90', '#501d0c', 500, 300, 200, 0, 2);
    linha(5, '#854722', '#854722', 500, 297.5, 610, 297.5);
    linha(5, '#501d0c', '#501d0c', 500, 297.5, 560, 297.5);
    texto(10, '#501d0c', '60px Arial', 'center', '12', 500, 160);
    texto(10, '#501d0c', '60px Arial', 'center', '6', 500, 485);
    texto(10, '#501d0c', '60px Arial', 'center', '9', 330, 320);
    texto(10, '#501d0c', '60px Arial', 'center', '3', 670, 320);
    texto(10, '#501d0c', '60px Arial', 'center', '1', 585, 185);
    texto(10, '#501d0c', '60px Arial', 'center', '2', 650, 240);
    texto(10, '#501d0c', '60px Arial', 'center', '4', 650, 400);
    texto(10, '#501d0c', '60px Arial', 'center', '5', 585, 460);
    texto(10, '#501d0c', '60px Arial', 'center', '7', 415, 460);
    texto(10, '#501d0c', '60px Arial', 'center', '8', 350, 400);
    texto(10, '#501d0c', '60px Arial', 'center', '10', 365, 240);
    texto(10, '#501d0c', '60px Arial', 'center', '11', 415, 185);
  }
  if (mostrarRetangulo && mostrarTexto && telaAtual === tela_2 && colisaoEstante() == true) {
    Retangulo(5,'#ceaa90', '#501d0c', 245, 15, 505, 565);
    texto(10, '#501d0c', '25px Gloria Hallelujah', 'center', 'AM vem do latim ante meridiem', 500, 65);
    texto(10, '#501d0c', '25px Gloria Hallelujah', 'center', '= antes do meio-dia.', 500, 100);
    texto(10, '#501d0c', '25px Gloria Hallelujah', 'center', 'PM vem de post meridiem', 500, 135);
    texto(10, '#501d0c', '25px Gloria Hallelujah', 'center', '= depois do meio-dia.', 500, 170);
    texto(10, '#501d0c', '65px Gloria Hallelujah', 'center', 'Atlas', 500, 245);
    texto(10, '#501d0c', '65px Gloria Hallelujah', 'center', '+', 500, 305);
    texto(10, '#501d0c', '65px Gloria Hallelujah', 'center', 'Orion', 500, 370);
    texto(10, '#501d0c', '45px Gloria Hallelujah', 'center', 'Melhores Amigos', 500, 435);
    texto(10, '#501d0c', '45px Gloria Hallelujah', 'center', 'para Sempre!', 500, 520);
  }
  if (mostrarRetangulo && mostrarTexto && telaAtual === tela_2 && colisaoPorta() == true) {
    Retangulo(2, 'black', 'white', 20, 400, 960, 180);
    texto(10, 'white','25px Gloria Hallelujah', 'center', 'Está porta não abre.', 500, 490)
    if (Date.now() >= tempoRetangulo && tempotexto) {
      mostrarRetangulo = false; // Esconde o retângulo
      mostrarTexto = false;
      jaColidiu = false; // Libera para colidir novamente no futuro
    }
  }
  if(mostraImagem && telaAtual === tela_2 && colisaoGeladeira() == true) {
    flotoGeladeira.desenhe();
  }
  if (mostraImagem && telaAtual === tela_2 && ColisaoCadeado() == true) {
    cadeado.desenhe();
    if (!podeDigitar && Date.now() > tempoErro) {
      podeDigitar = true;
      senhaDigitada = "";
      senhaErrada = "";
    }
    if (digitandoSenha && telaAtual === tela_2) {
      let senhaParaMostrar;
      if (!podeDigitar) {
        senhaParaMostrar = senhaErrada;
      } else {
        senhaParaMostrar = senhaDigitada;
      }
      const posicaoInicial = 380; // Posição X inicial
      const espacamento = 70;     // 10px entre dígitos
      for (let i = 0; i < senhaParaMostrar.length; i++) {
        texto(2, 'white', '50px Gloria Hallelujah', 'center', 
          senhaParaMostrar[i], 
          posicaoInicial + (i * (50 + espacamento)), 395);
      }
    }
  }
  if (digitandoSenha == false && mostrarRetangulo && mostrarTexto && telaAtual === tela_3) {
    Retangulo(2, 'black', 'white', 20, 400, 960, 180);
    texto(10, 'white','25px Gloria Hallelujah', 'center', 'Um corredor escuro com um bau. Você cogita voltar, mas novamente uma', 500, 480);
    texto(10, 'white','25px Gloria Hallelujah', 'center', 'voz te impede “Orion, cadê você?” você segue até o bau..', 500, 520)
    if (Date.now() >= tempoRetangulo && tempotexto) {
      mostrarRetangulo = false; // Esconde o retângulo
      mostrarTexto = false;
    }
  }
  if (mostraImagem && telaAtual === tela_3 && colisaoBau() == true) {
    flotoCorpo.desenhe();
    if (Date.now() >= tempoImagem) {
      mostraImagem = false;
      telaAtual = tela_4;
      ctx.clearRect(0, 0, canva1.width, canva1.height); // Limpa o canvas
      tela_4.desenhe();
    }
  }
  if (telaAtual === tela_4) {
    Retangulo(2, 'black', 'white', 60, 60, 880, 490);
    texto(10, 'white', '25px Gloria Hallelujah', 'center', 'Apesar da cena, você permanece estranhamente calmo.', 500, 120);
    texto(10, 'white', '25px Gloria Hallelujah', 'center', 'Finalmente, você se lembra… Você e seu amigo estavam brincando', 500, 165);
    texto(10, 'white', '25px Gloria Hallelujah', 'center', 'de esconde-esconde naquela sala — o jogo estava empatado.', 500, 210);
    texto(10, 'white', '25px Gloria Hallelujah', 'center', 'Você já havia se escondido em quase todos os lugares; seu', 500, 255);
    texto(10, 'white', '25px Gloria Hallelujah', 'center', 'amigo estava quase terminando a contagem. Você começou a mexer', 500, 300);
    texto(10, 'white', '25px Gloria Hallelujah', 'center', 'em algumas caixas, tentando abrir um espaço onde pudesse se', 500, 345);
    texto(10, 'white', '25px Gloria Hallelujah', 'center', 'enfiar, até que percebeu, atrás delas, um grande baú.', 500, 390);
    texto(10, 'white', '25px Gloria Hallelujah', 'center', '“8, 7, 6...”', 500, 435);
    texto(10, 'white', '25px Gloria Hallelujah', 'center', 'Você não pensou duas vezes. Rapidamente, entrou dentro dele.', 500, 480);
  }
  requestAnimationFrame(() => animation(telaAtual));
}

let tela_1 = {
  tela: new Telas("Imagens/praia.jpeg", 0, 0, 1000, 600),
  porta: porta_cabana,
  desenhe: function () {
    this.tela.desenhe();
    this.porta.desenhe();
    orion.desenhe();
  },
};

let tela_2 = {
  tela: new Telas("Imagens/fundo-cabana.jpeg", 0, 0, 1000, 600),

  cenario_tras: [
    bancada_cozinha1,
    bancada_cozinha2,
    planta,
    fogao,
    geladeira,
    porta1,
    porta2,
    estante,
    relogio,
    cadeado_fechado,
    quadro,
  ],

  cenario_frente: [
    cadeira_jantar_frente1,
    cadeira_jantar_frente2,
    cadeira_jantar_esquerda,
    cadeira_jantar_direita,
    mesa_jantar,
    florzinha,
    cadeira_jantar_atras1,
    cadeira_jantar_atras2,
    mesa_tv,
    televisao,
    sofa_lado1,
    sofa_lado2,
    sofa,
    mesinha,
    livros
  ],

  cenario_baixo: [tapete_da_sala, tapete],

  desenhe: function () {
    this.tela.desenhe();
    this.cenario_baixo.forEach((obj) => obj.desenhe());
    this.cenario_tras.forEach((obj) => obj.desenhe());
    orion.desenhe();
    this.cenario_frente.forEach((obj) => obj.desenhe());
  },
};

let tela_3 = {
  tela: new Telas('Imagens/tela3.jpg', 0, 0, canva1.width, canva1.height),
  cenario: bau,
  desenhe: function() {
    this.tela.desenhe();
    this.cenario.desenhe();
    orion.desenhe();
  }
}

let tela_4 = {
  tela: new Telas('Imagens/tela3.jpg', 0, 0, canva1.width, canva1.height),
  desenhe: function() {
    this.tela.desenhe(); // Desenha o fundo da tela_4
    // Aqui você pode adicionar outros elementos da tela_4 se necessário
  }
};

function colisao(PosX, PosY){
  const objParaColidir1 = tela_2.cenario_frente.filter(obj =>
    obj === mesa_jantar ||
    obj === cadeira_jantar_atras1 ||
    obj === cadeira_jantar_atras2 ||
    obj === mesa_tv ||
    obj === sofa_lado1 ||
    obj === sofa_lado2 ||
    obj === sofa ||
    obj === mesinha ||
    obj === livros
  )
  for(var obj of objParaColidir1) {
    if(
      PosX + orion.width > obj.x &&
      PosX < obj.x + obj.width &&
      PosY + orion.height > obj.y &&
      PosY < obj.y + obj.height
    ) {
      return true;
    }
  }
  return false;
};

function colisaoBancada2() {
  const bancada = tela_2.cenario_tras.find(obj => obj.url_img.includes("bancada-cozinha2"));
  if (!bancada) return false;
  return (
      orion.x + orion.width > bancada.x &&
      orion.x < bancada.x + bancada.width &&
      orion.y + orion.height > bancada.y &&
      orion.y < bancada.y + bancada.height
  );
}

function colisaoBau() {
  if (!tela_3.cenario) return false;
  return (
      orion.x + orion.width > tela_3.cenario.x &&
      orion.x < tela_3.cenario.x + tela_3.cenario.width &&
      orion.y + orion.height > tela_3.cenario.y &&
      orion.y < tela_3.cenario.y + tela_3.cenario.height
  );
}

function colisaoPlanta() {
  const planta = tela_2.cenario_tras.find(obj => obj.url_img.includes("planta"));
  if (!planta) return false;
  return (
      orion.x + orion.width > planta.x &&
      orion.x < planta.x + planta.width &&
      orion.y + orion.height > planta.y &&
      orion.y < planta.y + planta.height
  );
}

function colisaoJantar(PosX, PosY){
  const objParaColidir1 = tela_2.cenario_frente.filter(obj =>
    obj === cadeira_jantar_frente1 ||
    obj === cadeira_jantar_frente2 ||
    obj === cadeira_jantar_esquerda ||
    obj === cadeira_jantar_direita 
  )
  for(var obj of objParaColidir1) {
    if(
      PosX + orion.width > obj.x &&
      PosX < obj.x + obj.width &&
      PosY + orion.height > obj.y &&
      PosY < obj.y + obj.height
    ) {
      return true;
    }
  }
  return false;
};

function colisaoPorta(){
  const porta = tela_2.cenario_tras.find(obj => obj.url_img.includes("porta2"));
  if (!porta) return false;
  return (
      orion.x + orion.width > porta.x &&
      orion.x < porta.x + porta.width &&
      orion.y + orion.height > porta.y &&
      orion.y < porta.y + porta.height
  );
}

function colisao2(PosX, PosY){
  const objParaColidir1 = tela_2.cenario_tras.filter(obj =>
    obj === bancada_cozinha1 ||
    obj === fogao 
  )
  for(var obj of objParaColidir1) {
    if(
      PosX + orion.width > obj.x &&
      PosX < obj.x + obj.width &&
      PosY + orion.height > obj.y &&
      PosY < obj.y + obj.height
    ) {
      return true;
    }
  }
  return false;
};

function colisaoGeladeira() {
  const geladeira = tela_2.cenario_tras.find(obj => obj.url_img.includes("geladeira"));
  if (!geladeira) return false;
  return (
      orion.x + orion.width > geladeira.x &&
      orion.x < geladeira.x + geladeira.width &&
      orion.y + orion.height > geladeira.y &&
      orion.y < geladeira.y + geladeira.height
  );
}

function colisaoRelogio(){
  const relogio = tela_2.cenario_tras.find(obj => obj.url_img.includes("relogio"));
  if (!relogio) return false;
  return (
      orion.x + orion.width > relogio.x &&
      orion.x < relogio.x + relogio.width &&
      orion.y + orion.height > relogio.y &&
      orion.y < relogio.y + relogio.height
  );
};

function colisaoEstante(){
  const estante = tela_2.cenario_tras.find(obj => obj.url_img.includes("estante"));
  if (!estante) return false;
  return (
      orion.x + orion.width > estante.x &&
      orion.x < estante.x + estante.width &&
      orion.y + orion.height > estante.y &&
      orion.y < estante.y + estante.height
  );
};

function ColisaoTrocadeTela_Tela1ToTela2() {
  if(
    orion.x + orion.width > tela_1.porta.x &&
    orion.x < tela_1.porta.x + tela_1.porta.width &&
    orion.y + orion.height > tela_1.porta.y &&
    orion.y < tela_1.porta.y + tela_1.porta.height && 
    telaAtual === tela_1
  ) {
    return true;
  }
  return false;
}

function ColisaoCadeado() {
  const cadeado = tela_2.cenario_tras.find(obj => obj.url_img.includes("cadeado_fechado"));
  if (!cadeado) return false;
  return (
      orion.x + orion.width > cadeado.x &&
      orion.x < cadeado.x + cadeado.width &&
      orion.y + orion.height > cadeado.y &&
      orion.y < cadeado.y + cadeado.height
  );
}

document.addEventListener("keydown", function (evento) {
  let tecla = evento.key;
  let velocidade = 4;

  let novaX = orion.x;
  let novaY = orion.y;
 //Teclas de movimentação
  if (tecla == "W" || tecla == "w") {
    novaY -= velocidade;
    orion.mudarDirecao("costas");
  }
  if (tecla == "S" || tecla == "s") {
    novaY += velocidade;
    orion.mudarDirecao("frente");
  }
  if (tecla == "A" || tecla == "a") {
    novaX -= velocidade;
    orion.mudarDirecao("esquerda");
  }
  if (tecla == "D" || tecla == "d") {
    novaX += velocidade;
    orion.mudarDirecao("direita");
  }
  orion.atualizarFrame();
 //Limites das Telas e Colisões
  if (telaAtual === tela_1){
    orion.x = Math.max(0, Math.min(canva1.width - orion.width, novaX));
    orion.y = Math.max(0, Math.min(canva1.height - orion.height, novaY));
    if (ColisaoTrocadeTela_Tela1ToTela2() && !jaColidiu && telaAtual === tela_1) {
      jaColidiu = true; // Bloqueia novas colisões
      mostrarRetangulo = true; // Ativa o retângulo
      mostrarTexto = true;
      tempoRetangulo = Date.now() + 15000;
      tempotexto = Date.now() + 15000;
    }
  } else if (telaAtual === tela_2 && !colisao(novaX, novaY)){
    orion.x = Math.max(0, Math.min(canva1.width - orion.width, novaX));
    orion.y = Math.max(104, Math.min(canva1.height - orion.height, novaY));
    if (colisaoBancada2()) {
      orion.x = Math.max(0, Math.min(893, novaX));
      orion.y = Math.max(162, Math.min(canva1.height - orion.height, novaY));
    }
    if (colisaoPlanta()) {
      orion.y = Math.max(296, Math.min(canva1.height - orion.height, novaY));
    }
    if (colisaoJantar(novaX, novaY)){
      orion.y = Math.max(0, Math.min(318, novaY));
    }
    if (colisao2(novaX, novaY)) {
      orion.y = Math.max(162, Math.min(canva1.height - orion.height, novaY));
    }
    if (colisaoPorta()){
      if (tecla == "E" || tecla == "e" && !jaColidiu && telaAtual === tela_2){
        jaColidiu = true;
        mostrarRetangulo = true;
        mostrarTexto = true;
        tempoRetangulo = Date.now() + 5000;
        tempotexto = Date.now() + 5000;
      };
    }
    if (colisaoGeladeira()){
      orion.y = Math.max(162, Math.min(canva1.height - orion.height, novaY));
      if (tecla == "E" || tecla == "e" && !jaColidiu && telaAtual === tela_2){
        jaColidiu = true;
        mostraImagem = true;
      };
      if(tecla == "Q" || tecla == "q" && jaColidiu){
        jaColidiu = false;
        mostraImagem = false;
      }
    }
    if (colisaoRelogio()) {
      orion.y = Math.max(140, Math.min(canva1.height - orion.height, novaY));
      if (tecla == "E" || tecla == "e" && !jaColidiu && telaAtual === tela_2){
        jaColidiu = true;
        mostrarCirculo = true;
        mostrarTexto = true;
        mostraLinha = true;
      };
      if(tecla == "Q" || tecla == "q" && jaColidiu){
        jaColidiu = false;
        mostrarCirculo = false;
        mostrarTexto = false;
        mostraLinha = false;
      }
    }
    if (colisaoEstante()) {
      orion.y = Math.max(132, Math.min(canva1.height - orion.height, novaY));
      if (tecla == "E" || tecla == "e" && !jaColidiu && telaAtual === tela_2){
        jaColidiu = true;
        mostrarRetangulo = true;
        mostrarTexto = true;
      };
      if(tecla == "Q" || tecla == "q" && jaColidiu){
        jaColidiu = false;
        mostrarRetangulo = false;
        mostrarTexto = false;
      }
    }
    if (ColisaoCadeado()) {
      if (tecla == "E" || tecla == "e" && !jaColidiu && telaAtual === tela_2){
        jaColidiu = true;
        mostraImagem = true;
        digitandoSenha = true;
        senhaDigitada = "";
        podeDigitar = true;
      };
      if(tecla == "Q" || tecla == "q" && jaColidiu){
        jaColidiu = false;
        mostraImagem = false;
        digitandoSenha = false;
      }
      if (digitandoSenha && podeDigitar && telaAtual === tela_2) {
        // Aceita apenas dígitos de 0 a 9
        if (/^[0-9]$/.test(tecla)) {
          senhaDigitada += tecla;
          
          if (senhaDigitada.length === 3) {
            if (senhaDigitada === "153") {
              digitandoSenha = false;
              senhaDigitada = "";
              telaAtual = tela_3 
              ctx.clearRect(0, 0, canva1.width, canva1.height); // Limpa o canvas
              tela_3.desenhe(); // Desenha a tela_3
              orion.x = 473.5; // Posição inicial na tela_3
              orion.y = 500;
              mostrarRetangulo = true;
              mostrarTexto = true;
              tempoRetangulo = Date.now() + 7000;
              tempotexto = Date.now() + 7000;
            } else {
              senhaErrada = senhaDigitada;
              podeDigitar = false;
              tempoErro = Date.now() + 1000;
            }
          }
        }
        if (tecla === "Backspace") {
          digitandoSenha = false;
          senhaDigitada = "";
        }
      }
    }
  } else if (telaAtual === tela_3) {
    orion.x = Math.max(375, Math.min(625 - orion.width, novaX));
    orion.y = Math.max(128, Math.min(canva1.height - orion.height, novaY));
    if (colisaoBau()) {
      mostraImagem = true;
      tempoImagem = Date.now() + 10000;
      musica.pause();
      musica2.play();
      musica2.loop = true;
    }
  }
});

animation(tela_4)