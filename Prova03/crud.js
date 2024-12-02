document.addEventListener("DOMContentLoaded", () => {
    const consultarBtn = document.getElementById("consultarBtn");
    const idInput = document.getElementById("idConsulta");
    const modal = document.getElementById("addModal");
    const cancelBtn = document.getElementById("cancelBtn");
    const addForm = document.getElementById("addForm");
    const tableContainer = document.getElementById("table-container");

    let isEditing = false;
    let currentEditingId = null;

    consultarBtn.addEventListener("click", async () => {
        const id = idInput.value.trim();
        if (!id) {
            alert("Por favor, informe um ID válido!");
            return;
        }

        const apiUrl = `https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/${id}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: Não foi possível consultar o ID ${id}`);
            }

            const data = await response.json();
            criarTabela(data);
        } catch (error) {
            console.error("Erro ao consultar a API:", error.message);
            alert("Erro ao consultar o ID. Verifique e tente novamente.");
        }
    });

    cancelBtn.addEventListener("click", () => {
        modal.style.display = "none";
        addForm.reset();
    });

    addForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const departamento = document.getElementById("departamento").value.trim();
        const endereco = document.getElementById("endereco").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!nome || !departamento || !endereco || !email) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        const payload = { nome, departamento, endereco, email };

        try {
            if (isEditing && currentEditingId) {
                const apiUrl = `https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/${currentEditingId}`;
                const response = await fetch(apiUrl, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                const result = await response.json();
                mostrarMensagem(result.status, result.mensagem);

                if (result.status === "Ok") {
                    modal.style.display = "none";
                    addForm.reset();
                }
            }
        } catch (error) {
            console.error("Erro ao salvar o registro:", error.message);
            alert("Erro ao salvar o registro. Tente novamente.");
        }
    });

    function criarTabela(dado) {
        tableContainer.innerHTML = "";

        const tabela = document.createElement("table");
        tabela.setAttribute("border", "1");
        tabela.style.borderCollapse = "collapse";
        tabela.style.width = "100%";

        const cabecalho = ["ID", "Nome", "Departamento", "Endereço", "E-mail", "Editar", "Excluir"];
        const thead = document.createElement("thead");
        const linhaCabecalho = document.createElement("tr");

        cabecalho.forEach((titulo) => {
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
        const linha = document.createElement("tr");

        const celulas = [dado.id, dado.nome, dado.departamento, dado.endereco, dado.email];
        celulas.forEach((celulaTexto) => {
            const td = document.createElement("td");
            td.textContent = celulaTexto;
            td.style.padding = "8px";
            linha.appendChild(td);
        });

        const editarTd = document.createElement("td");
        const editarBtn = criarBotaoEditar(dado);
        editarTd.appendChild(editarBtn);
        linha.appendChild(editarTd);

        const excluirTd = document.createElement("td");
        const excluirBtn = criarBotaoExcluir(dado.id);
        excluirTd.appendChild(excluirBtn);
        linha.appendChild(excluirTd);

        tbody.appendChild(linha);
        tabela.appendChild(tbody);

        tableContainer.appendChild(tabela);
    }

    function criarBotaoEditar(dado) {
        const img = document.createElement("img");
        img.src = "images/edit.png";
        img.alt = "Editar";
        img.style.cursor = "pointer";
        img.style.width = "20px";
        img.style.height = "20px";

        img.addEventListener("click", () => {
            isEditing = true;
            currentEditingId = dado.id;
            abrirModal(dado);
        });

        return img;
    }

    function criarBotaoExcluir(id) {
        const img = document.createElement("img");
        img.src = "images/trash.png";
        img.alt = "Excluir";
        img.style.cursor = "pointer";
        img.style.width = "20px";
        img.style.height = "20px";

        img.addEventListener("click", async () => {
            const confirmacao = confirm(`Tem certeza de que deseja excluir este item?`);
            if (confirmacao) {
                const apiUrl = `https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/${id}`;
                try {
                    const response = await fetch(apiUrl, { method: "DELETE" });
                    const result = await response.json();
                    mostrarMensagem(result.status, result.mensagem);

                } catch (error) {
                    console.error("Erro ao excluir o item:", error.message);
                    alert("Erro ao excluir o item. Tente novamente.");
                }
            }
        });

        return img;
    }

    function abrirModal(dado = {}) {
        modal.style.display = "flex";

        document.getElementById("nome").value = dado.nome || "";
        document.getElementById("departamento").value = dado.departamento || "";
        document.getElementById("endereco").value = dado.endereco || "";
        document.getElementById("email").value = dado.email || "";
    }

    function mostrarMensagem(status, mensagem) {
        const msgDiv = document.createElement("div");
        msgDiv.textContent = mensagem;
        msgDiv.style.padding = "10px";
        msgDiv.style.margin = "10px 0";
        msgDiv.style.color = "white";
        msgDiv.style.textAlign = "center";
        msgDiv.style.backgroundColor = status === "Ok" ? "green" : "red";
    
        tableContainer.appendChild(msgDiv);
        setTimeout(() => msgDiv.remove(), 3000);
    }
    
});
