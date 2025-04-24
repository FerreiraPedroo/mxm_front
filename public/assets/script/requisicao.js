async function carregarRequisicao() {
 const query = new URLSearchParams(location.search);
 const requisicaoInfo = await API.fetchDados(`/requisicao?requisicaoID=${query.get("requisicaoID")}`, "GET");
 console.log(requisicaoInfo);
 if(requisicaoInfo.dados) {
  const requisicaoNumeroEl = document.getElementById("requisicao-numero");
  requisicaoNumeroEl.innerHTML = requisicaoInfo.dados.req;

  const itemsEl = document.getElementById("items");
  itemsEl.innerHTML = "";
   requisicaoInfo.dados.itens.forEach((item) => {
    items.innerHTML += `
     <div class="item-box">
      <img class="item-imagem" src="default.png"/>
      <div class="item-info">
       <div class="item-nome">Lampada Fluorescente 20w</div>
      </div>
      <div class="item-quantidade">Quantidade total: ${item.quantidade}</div>
      <div class="item-entregue">Entregue: 999</div>
      <div class="item-pendente">Pendente: 999</div>
     </div>
    `;


   })
 } else {
  itemsEl.innerHTML += "Não há itens";
 }


}

carregarRequisicao();

