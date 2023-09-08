const cores = ["rgb(255, 0, 0)", "rgb(36, 25, 194)", "rgb(255, 255, 0)", "rgb(0, 128, 0)"];
var jogando = false;
var tempoInicial, tempoFinal, tempoReacao = 0, mediaReacao = 0;
var arrTempoReacao = [];
var acertos = 0, erros = 0;

addEventListener("keydown", KeyboardEvent => {
    let circulo = document.getElementById("circulo");
    let cor = window.getComputedStyle(circulo).backgroundColor;

    if (jogando) {
        switch(KeyboardEvent.code) {
            case "ArrowUp":
                if(cor == cores[2]) {
                    calculaReacao()
                    mudarCirculo(2);
                    acertos++;
                } else {
                    erros++;
                }
                break;
            case "ArrowRight":
                if(cor == cores[1]) {
                    calculaReacao()
                    mudarCirculo(1);
                    acertos++;
                } else {
                    erros++;
                }
                break;
            case "ArrowDown":
                if(cor == cores[3]) {
                    calculaReacao()
                    mudarCirculo(3);
                    acertos++;
                } else {
                    erros++;
                }
                break;
            case "ArrowLeft":
                if(cor == cores[0]) {
                    calculaReacao()
                    mudarCirculo(0);
                    acertos++;
                } else {
                    erros++;
                }
                break;
            case "Space":
                circulo.style.display = "none";
                jogando = false;
                break;
        }
    } else {
        if (KeyboardEvent.code == "Space") {
            circulo.style.display = "block";
            jogando = true;
            iniciaJogo();
            mudarCirculo(-1);
        }
    }
    atualizaDados();
});

function mudarCirculo(index) {
    let telaJogo = document.getElementById("telaJogo");
    let circulo = document.getElementById("circulo");

    let widthCirculo = window.getComputedStyle(circulo).width;
    widthCirculo = parseFloat(widthCirculo.split("px")[0]);
    let heightCirculo = window.getComputedStyle(circulo).height;
    heightCirculo = parseFloat(heightCirculo.split("px")[0]);
    let widthTelaJogo = window.getComputedStyle(telaJogo).width;
    widthTelaJogo = parseFloat(widthTelaJogo.split("px")[0]);
    let heightTelaJogo = window.getComputedStyle(telaJogo).height;
    heightTelaJogo = parseFloat(heightTelaJogo.split("px")[0]);

    do {
        var novoIndex = Math.floor(Math.random() * 4);
    } while (index == novoIndex);

    do {
        var top = Math.floor(Math.random() * heightTelaJogo);
    } while ((top + heightCirculo) > heightTelaJogo);

    do {
        var left = Math.floor(Math.random() * widthTelaJogo);
    } while ((left + widthCirculo) > widthTelaJogo);

    circulo.style.display = "none";

    setTimeout(() => {
        
        circulo.style.backgroundColor = cores[novoIndex];
        circulo.style.top = top+"px";
        circulo.style.left = left+"px";
        circulo.style.display = "block";
        tempoInicial = new Date();
    }, 1000);
}

function calculaReacao() {
    tempoFinal = new Date();
    tempoReacao = (tempoFinal.getTime() - tempoInicial.getTime()) / 1000;
    arrTempoReacao.push(tempoReacao);

    let soma = 0
    arrTempoReacao.forEach(tempo => {
        soma+=tempo
    });

    mediaReacao = (soma / arrTempoReacao.length).toFixed(3);
}

function atualizaDados() {
    let acertosDOM = document.getElementById("acertos");
    let errosDOM = document.getElementById("erros");
    let pontuacao = document.getElementById("pontuacao");
    let tempoReacaoDOM = document.getElementById("tempoReacao");
    let mediaReacaoDOM = document.getElementById("mediaReacao");

    acertosDOM.textContent = acertos;
    errosDOM.textContent = erros;
    pontuacao.textContent = acertos - erros;
    tempoReacaoDOM.textContent = tempoReacao;
    mediaReacaoDOM.textContent = mediaReacao;
}

function iniciaJogo() {
    let acertosDOM = document.getElementById("acertos");
    let errosDOM = document.getElementById("erros");
    let pontuacao = document.getElementById("pontuacao");
    let tempoReacaoDOM = document.getElementById("tempoReacao");
    let mediaReacaoDOM = document.getElementById("mediaReacao");

    acertos = 0;
    erros = 0;
    mediaReacao = 0;
    tempoReacao = 0;
    arrTempoReacao = [];

    acertosDOM.textContent = acertos;
    errosDOM.textContent = erros;
    pontuacao.textContent = acertos - erros;
    tempoReacaoDOM.textContent = tempoReacao;
    mediaReacaoDOM.textContent = mediaReacao;
}