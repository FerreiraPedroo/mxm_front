function tabelaHTML(cabecalhoInfo, notasFiscais) {
 let HTML = "";

 // ADICIONAR CABEÇALHO #################################################################################
 HTML += `<div class="lista-cabecalho">`;
 cabecalhoInfo.forEach((cabecalho) => {
  HTML +=`<div class="lista-coluna g-col-size-${cabecalho.tamanhoClasse}">${cabecalho.coluna}</div>`;
 });
 HTML += `</div>`;

 // ADICIONAR LINHAS ####################################################################################
 if (notasFiscais.length) {
  notasFiscais.forEach((notaFiscal) => {
   HTML += `<div class="lista-linha" data-id="${notaFiscal.id}" onclick="roteador('nota-fiscal-selecionada',${notaFiscal.id})">`;

   cabecalhoInfo.forEach((cabecalho) => {
    let linha = obterProximoValor(notaFiscal,cabecalho.linha)
    HTML +=`<div class="lista-coluna g-col-size-${cabecalho.tamanhoClasse}">${linha}</div>`;
   });

   HTML += `</div>`;

  });

 } else {
  HTML += `<div id="lista-linha-vazia">VAZIO</div>`;
 }
 
 return HTML;

}


function obterProximoValor(obj, keys) {
  return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}