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
       <input type="number" class="item-input-quantidade" value="0" min="0" max="${item.quantidade - notasFiscaisQuantidade}"/>
      </div>
     </div>
     
     `;
    }

   })


  }

 }
 return requisicaoInfo;
}




///////////////////////////////////////////////////////////////////////////////////////////////
// CARREGAR LISTA DE FORNECEDORES /////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
async function carregarModal() {
 const modalEl = document.getElementById("modal");
 modalEl.classList.remove("modal-esconder")
 modalEl.classList.add("modal-exibir")


 const fornecedoresEl = document.getElementById("select-lista");
 fornecedoresEl.innerHTML = "<div class='carregando'>Carregando... </div>";

 const requisicaoInfo = await API.fetchDados(`/fornecedores`, "GET");
 fornecedoresEl.innerHTML = "";

 if (requisicaoInfo.dados) {
  requisicaoInfo.dados.forEach((fornecedor) => {
   fornecedoresEl.innerHTML += `
      <div class="fornecedor-box" click="selecionarFornecedor(e, ${fornecedor.cnpj})">
       <img src="${fornecedor.imagem ? fornecedor.imagem : 'default.png'}" class="fornecedor-logo"/>
       <div class="fornecedor-info">
        <p class="fornecedor-cnpj">${fornecedor.cnpj}</p>
        <p class="fornecedor-razaosocial">${fornecedor.razao_social}</p>
       </div>
      </div>
    `;
  });
 }

}

function fecharModal() {
 const modalEl = document.getElementById("modal");
 modalEl.classList.add("modal-esconder")
 modalEl.classList.remove("modal-exibir")
 FORNECEDOR_SELECIONADO = null;
}










function selecionarFornecedor(e, fornecedorCNPJ) {
 FORNECEDOR_SELECIONADO = fornecedorCNPJ;
 const fornecedoresEl = document.getElementsByClassName("fornecedor-box");
 for (fornecedor of fornecedoresEl) {
  if(){





  }



 }
}


























function fornecedorSelecionado() {

 const modalEl = document.getElementById("modal");
 modalEl.classList.add("modal-esconder")
 modalEl.classList.remove("modal-exibir")
}



///////////////////////////////////////////////////////////////////////////////////////////////
// CARREGAR EVENT LSTENERS ////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
async function carregarEventsListeners() {

 // BOTÃO PARA ABRIR O MODAL DE ALTERAR FORNECEDOR.
 const botaoAlterarFornecedorEl = document.getElementById("fornecedor-alterar-botao");
 botaoAlterarFornecedorEl.addEventListener("click", carregarModal);
}




///////////////////////////////////////////////////////////////////////////////////////////////
// INICIAR SCRIPT DA PÁGINA ///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
async function principal() {
 const requisicaoInfo = await carregarRequisicao();
 await carregarEventsListeners();
}


principal();
