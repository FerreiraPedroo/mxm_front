// DADOS GLOBAIS
let FORNECEDOR_SELECIONADO = null;


///////////////////////////////////////////////////////////////////////////////////////////////
// CARREGAR OS DADOS DA REQUISIÇÃO E ENVIA PARA HTML //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
async function carregarRequisicao() {
 const query = new URLSearchParams(location.search);
 const requisicaoInfo = await API.fetchDados(`/requisicao?requisicaoID=${query.get("requisicaoID")}`, "GET");

 if (requisicaoInfo.dados) {

  // NUMERO DA REQUISIÇÃO
  const requisicaoNumeroEl = document.getElementById("requisicao-numero");
  requisicaoNumeroEl.innerHTML = requisicaoInfo.dados.req;

  // ITENS DA REQUISIÇÃO
  const itemsEl = document.getElementById("items");
  if (requisicaoInfo.dados.itens.length) {
   itemsEl.innerHTML = "";

   // ITENS - quantidade entregue.
   requisicaoInfo.dados.itens.forEach((item) => {
    let notasFiscaisQuantidade = 0

    if (requisicaoInfo.dados.notas_fiscais) {

     notasFiscaisQuantidade = requisicaoInfo.dados.notas_fiscais.reduce((acc, nf) => {
      nf.materiais.forEach(nfMatItem => {
       if (nfMatItem.item_id == item.id) {
        acc += nfMatItem.quantidade;
       }
      })
      return acc;
     }, 0)

    }

    // ITENS - HTML
    if (notasFiscaisQuantidade < item.quantidade) {
     itemsEl.innerHTML += `
     <div class="item-box">
      <img class="item-imagem" src="default.png"/>
      <div class="item-info">
      <div class="item-nome">${item.item_info.nome}</div>
     </div>
     <div class="item-quantidade">Total: ${item.quantidade}</div>
     <div class="item-pendente">Pendente: ${item.quantidade - notasFiscaisQuantidade}</div>
     <div class="item-inuts-box">
      <hr class="item-linha-vertical">
      <div>
       <p>Quantidade</p>
       <input type="number" class="item-input-quantidade form-input-item" name="${item.item_info.id}" min="0" max="${item.quantidade - notasFiscaisQuantidade}"/>
      </div>
     </div>
     
     `;
    }

   })


  }

 }
 return requisicaoInfo;
}




/*############################################################################
 CARREGAR MODAL COM A LISTA DE FORNECEDORES.
############################################################################*/

async function carregarModal() {
 const modalEl = document.getElementById("modal");
 modalEl.classList.remove("modal-esconder");
 modalEl.classList.add("modal-exibir");

 const fornecedoresEl = document.getElementById("select-lista");
 fornecedoresEl.innerHTML = "<div class='carregando'>Carregando... </div>";

 const requisicaoInfo = await API.fetchDados(`/fornecedores`, "GET");
 fornecedoresEl.innerHTML = "";

 if (requisicaoInfo.dados) {
  requisicaoInfo.dados.forEach((fornecedor) => {
   fornecedoresEl.innerHTML += `
      <div id="${fornecedor.id +"_"+ fornecedor.razao_social}" class="fornecedor-box" onclick="selecionarFornecedor('${fornecedor.id +"_"+ fornecedor.razao_social}')">
       <img src="${fornecedor.imagem ? fornecedor.imagem : 'default.png'}" class="fornecedor-logo"/>
       <div class="fornecedor-info">
        <input type="hidden" class="form-input" name="fornecedor_id" value="${fornecedor.id}">
        <p class="fornecedor-cnpj">${fornecedor.cnpj}</p>
        <p class="fornecedor-razaosocial">${fornecedor.razao_social}</p>
       </div>
      </div>
    `;
  });
 }
}




/*############################################################################
 FUNÇÃO PARA FECHAR O MODAL MUDAR FORNECEDOR.
############################################################################*/

function fecharModal() {
 const modalEl = document.getElementById("modal");
 modalEl.classList.add("modal-esconder");
 modalEl.classList.remove("modal-exibir");
 modalEl.innerHTML = "";
 FORNECEDOR_SELECIONADO = null;
}

function fornecedorSelecionado() {
 const modalEl = document.getElementById("modal");
 modalEl.classList.add("modal-esconder")
 modalEl.classList.remove("modal-exibir")
 modalEl.innerHTML = "";

 FORNECEDOR_SELECIONADO.classList.remove("fornecedor-selecionado");
 FORNECEDOR_SELECIONADO.classList.remove("fornecedor-box");
 FORNECEDOR_SELECIONADO.removeAttribute("onclick");
 FORNECEDOR_SELECIONADO.classList.add("item-box");

 const fornecedorEl = document.getElementById("fornecedor");
 fornecedorEl.innerHTML = "";

 fornecedorEl.appendChild(FORNECEDOR_SELECIONADO);
}




/*############################################################################
 FUNÇÃO PARA SELECIONAR O FORNECEDOR NO MODAL MUDAR FORNECEDOR.
############################################################################*/

function selecionarFornecedor(fornecedor) {
 const fornecedoresEl = document.getElementsByClassName("fornecedor-box");

 for (fornecedorEl of fornecedoresEl) {
  if(fornecedor == fornecedorEl.id){
   FORNECEDOR_SELECIONADO = fornecedorEl;
   fornecedorEl.classList.add("fornecedor-selecionado");
  } else {
   fornecedorEl.classList.remove("fornecedor-selecionado");
  }
 }
}




/*############################################################################
 CARREGAR EVENT LSTENERS
############################################################################*/

async function carregarEventsListeners() {
 // BOTÃO PARA ABRIR O MODAL DE ALTERAR FORNECEDOR.
 const botaoAlterarFornecedorEl = document.getElementById("fornecedor-alterar-botao");
 botaoAlterarFornecedorEl.addEventListener("click", carregarModal);
}




/*############################################################################
 SALVAR DADOS DA NOTA FISCAL
############################################################################*/
async function salvarNotaFiscal() {
 const valoresEl = document.getElementsByClassName("form-input");
 const itensEl = document.getElementsByClassName("form-input-item");

 let itemSelecionado = false;
 let fornecedorSelecionado = false;

 let itens = []
 for (const itemEl of itensEl) {
  if(itemEl.value != 0) {
   itens.push({[itemEl.name]: itemEl.value});
  }
 }
 
 let valores = []
 for (const valorEl of valoresEl) {
  if(valorEl.value != 0) {
   valores.push({[valorEl.name]: valorEl.value});
  }
 }




}






/*############################################################################
 INICIAR SCRIPT DA PÁGINA
############################################################################*/

async function principal() {
 const requisicaoInfo = await carregarRequisicao();
 await carregarEventsListeners();
}


principal();
