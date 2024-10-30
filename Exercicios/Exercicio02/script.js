const palavras = [
    "ARRAY", "CACHE", "CLOUD", "CODAR", "DEBUG", "DIGIT", "EMAIL", "FIBRA",
    "FRAME", "GITAR", "HACKS", "HTTPS", "INPUT", "LOGAR", "LOGIN", "LOGON",
    "LOOPS", "MACRO", "MOUSE", "NODES", "NUBES", "PATCH", "PIXEL", "PLUGS",
    "PROXY", "QUERY", "RAMAL", "ROUTE", "SHELL", "STACK", "SWIFT", "TABLE",
    "TOKEN", "TOOLS", "USUAR", "VIRUS", "VISTA", "VPNAS", "WEARS", "WIFIS",
    "ZONAR", "LINUX", "CIBER", "INODE"
];

let palavraEscolhida = escolherPalavra();
let jogoFinalizado = false;

function escolherPalavra() {
    const indice = Math.floor(Math.random() * palavras.length);
    return palavras[indice];
}

document.getElementById("form-palavra").addEventListener("submit", function (event) {
    event.preventDefault();
    
    if (jogoFinalizado) {
        alert("O jogo já foi finalizado! Reinicie para jogar novamente.");
        return;
    }
    
    const palavraDigitada = document.getElementById("palavra").value.toUpperCase();

    if (palavraDigitada.length === 5) {
        preencherTabela(palavraDigitada);
        verificarPalavra(palavraDigitada);
    } else {
        alert("A palavra deve ter 5 letras.");
    }

    document.getElementById("palavra").value = "";
});

function adicionarLinhaTabela() {
    const tabela = document.querySelector("table");
    const novaLinha = document.createElement("tr");

    for (let i = 0; i < 5; i++) {
        const novaCelula = document.createElement("td");
        novaLinha.appendChild(novaCelula);
    }

    tabela.appendChild(novaLinha);
}

function preencherTabela(palavra) {
    const tabela = document.querySelector("table");
    const linhas = tabela.querySelectorAll("tr");
    const celulas = linhas[linhas.length - 1].querySelectorAll("td");

    for (let i = 0; i < 5; i++) {
        celulas[i].textContent = palavra[i];
    }
}

function verificarPalavra(palavra) {
    let palavraCorreta = true;
    const tabela = document.querySelector("table");
    const linhas = tabela.querySelectorAll("tr");
    const celulas = linhas[linhas.length - 1].querySelectorAll("td");

    for (let i = 0; i < 5; i++) {
        if (palavra[i] === palavraEscolhida[i]) {
            celulas[i].classList.add("correto");
        } else if (palavraEscolhida.includes(palavra[i])) {
            celulas[i].classList.add("posicaoErrada");
            palavraCorreta = false;
        } else {
            celulas[i].classList.add("incorreto");
            palavraCorreta = false;
        }
    }

    if (palavraCorreta) {
        alert(`Você acertou! A palavra é: ${palavraEscolhida}`);
        jogoFinalizado = true;
    } else {
        adicionarLinhaTabela();
    }
}

document.getElementById("reiniciar").addEventListener("click", function () {
    palavraEscolhida = escolherPalavra();
    jogoFinalizado = false;
    const tabela = document.querySelector("table");
    tabela.innerHTML = "<tr><td></td><td></td><td></td><td></td><td></td></tr>";
});
