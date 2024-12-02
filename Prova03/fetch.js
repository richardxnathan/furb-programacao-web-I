document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar os dados: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            criarTabela(data);
        })
        .catch(error => {
            console.error("Erro:", error);
        });
});

function criarTabela(dados) {
    const tabela = document.createElement("table");
    tabela.setAttribute("border", "1");
    tabela.style.borderCollapse = "collapse";
    tabela.style.width = "100%";

    const cabecalho = ["ID", "Nome", "Departamento", "Endereço", "E-mail"];
    const thead = document.createElement("thead");
    const linhaCabecalho = document.createElement("tr");

    cabecalho.forEach(titulo => {
        const th = document.createElement("th");
        th.textContent = titulo;
        th.style.padding = "8px";
        th.style.backgroundColor = "#f2f2f2";
        th.style.textAlign = "left";
        linhaCabecalho.appendChild(th);
    });

    thead.appendChild(linhaCabecalho);
    tabela.appendChild(thead);

    const tbody = document.createElement("tbody");

    dados.forEach(item => {
        const linha = document.createElement("tr");

        const celulas = [
            item.id,
            item.nome,
            item.departamento,
            item.endereco,
            item.email
        ];

        celulas.forEach(celulaTexto => {
            const td = document.createElement("td");
            td.textContent = celulaTexto;
            td.style.padding = "8px";
            linha.appendChild(td);
        });

        tbody.appendChild(linha);
    });

    tabela.appendChild(tbody);

    const tableContainer = document.getElementById("table-container");
    tableContainer.appendChild(tabela);

}

let id = 15;

document.addEventListener("DOMContentLoaded", () => {
    const addCadastroBtn = document.getElementById("addCadastroBtn");
    const modal = document.getElementById("addModal");
    const cancelBtn = document.getElementById("cancelBtn");
    const addForm = document.getElementById("addForm");
    const tableContainer = document.getElementById("table-container");

    addCadastroBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    cancelBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    addForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const confirmacao = confirm(`Tem certeza de que deseja incluir um novo registro?`);
        if (confirmacao) {
            const nome = document.getElementById("nome").value;
            const departamento = document.getElementById("departamento").value;
            const endereco = document.getElementById("endereco").value;
            const email = document.getElementById("email").value;

            const tabela = tableContainer.querySelector("table");
            const tbody = tabela.querySelector("tbody");
            const novaLinha = document.createElement("tr");

            const celulas = [++id, nome, departamento, endereco, email];
            celulas.forEach(celulaTexto => {
                const td = document.createElement("td");
                td.textContent = celulaTexto;
                td.style.padding = "8px";
                novaLinha.appendChild(td);
            });

            const acaoTd = document.createElement("td");
            const img = document.createElement("img");
            img.src = "images/trash.png";
            img.alt = "Excluir";
            img.style.cursor = "pointer";
            img.style.width = "20px";
            img.style.height = "20px";

            img.addEventListener("click", () => {
                const confirmacao = confirm(`Tem certeza de que deseja excluir o item com nome ${nome}?`);
                if (confirmacao) {
                    alert(`O item com Nome ${nome} foi excluído com sucesso!`);
                    novaLinha.remove();
                }
            });

            acaoTd.appendChild(img);
            novaLinha.appendChild(acaoTd);

            tbody.appendChild(novaLinha);

            modal.style.display = "none";
            addForm.reset();

            alert(`O item com nome ${nome} foi incluido com sucesso!`);
        }
    });
});
