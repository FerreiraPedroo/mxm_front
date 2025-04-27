async function carregarRequisicao() {
 const query = new URLSearchParams(location.search);
 const requisicaoInfo = await API.fetchDados(`/requisicao?requisicaoID=${query.get("requisicaoID")}`, "GET");

 console.log(requisicaoInfo)

 if (requisicaoInfo.dados) {

  // NUMERO DA REQUISIÇÃO
  const requisicaoNumeroEl = document.getElementById("requisicao-numero");
  requisicaoNumeroEl.innerHTML = requisicaoInfo.dados.req;

  // DATAS DA REQUISIÇÃO
  const requisicaoDatas = document.getElementsByClassName("data-input");
  for (reqDados of requisicaoDatas) {
   if (requisicaoInfo.dados[reqDados.name]) {
    reqDados.value = requisicaoInfo.dados[reqDados.name].split("/").reverse().join("-");
   }
  }

  // ITEMS DA REQUISIÇÃO
  const itemsEl = document.getElementById("items");
  itemsEl.innerHTML = "";
  requisicaoInfo.dados.itens.forEach((item) => {
   itemsEl.innerHTML += `
     <div class="item-box">
      <img class="item-imagem" src="default.png"/>
      <div class="item-info">
       <div class="item-nome">${item.item_info.nome}</div>
      </div>
      <div class="item-quantidade">Quantidade total: ${item.quantidade}</div>
      <div class="item-entregue">Entregue: ${requisicaoInfo.dados.notas_fiscais.reduce((acc, nf) => {
    nf.materiais.forEach(nfMatItem => {
     if (nfMatItem.item_id == item.id) {
      acc += nfMatItem.quantidade;
     }
    })
    return acc;
   }, 0)}</div>
      <div class="item-pendente">Pendente: 999</div>
     </div>
    `;
  })
 } else {
  itemsEl.innerHTML += "Não há itens";
 }


}

carregarRequisicao();

