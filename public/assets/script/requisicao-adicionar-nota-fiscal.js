// CARREGAR OS DADOS DA REQUISIÇÃO E ENVIA PARA HTML ///////////////////////////////////////////
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
    itemsEl.innerHTML += `
      <div class="item-box">
       <img class="item-imagem" src="default.png"/>
       <div class="item-info">
        <div class="item-nome">${item.item_info.nome}</div>
       </div>
       <div class="item-quantidade">Total: ${item.quantidade}</div>
       <div class="item-pendente">Pendente: ${item.quantidade - notasFiscaisQuantidade}</div>
       <div class="item-entregue">Entregue: ${notasFiscaisQuantidade}</div>
      </div>
     `;
   })
  }

 }
 return requisicaoInfo;
}





async function principal() {
 const requisicaoInfo = await carregarRequisicao();



}
principal();
