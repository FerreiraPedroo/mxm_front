// #################################################################
// ###  CAMINHOS DOS ARQUIVOS DE SCRIPT  ###########################
// #################################################################

const arquivoPorLocalizacao = {
 "/requisicao-lista": "./paginas/requisicaoLista/requisicaoLista.js",
 "/requisicao-novo": "./paginas/requisicaoNovo/requisicaoNovo.js",
 "/requisicao-selecionada": "./paginas/requisicaoSelecionada/requisicaoSelecionada.js",
 "/orcamento-lista": "./paginas/orcamentoLista/orcamentoLista.js",
 "/orcamento-novo": "./paginas/orcamentoNovo/orcamentoNovo.js",
}

const arquivosDeScriptInicial = [
 "./roteador.js",
 "./servicos/API.js",
 "./componentes/componentesHTML.js",
 "./componentes/menuPrincipal.js",
 "./componentes/menuAcoes.js",
 "./componentes/menuTabs.js",
 "./componentes/modal.js",
 "./componentes/scriptsComponentes.js",
 "./componentes/tabelas/tabela.js",
]

const arquivosDeScriptPaginas = [];

// SE O PATHNAME EXISTIR NO ARQUIVO DE LOCALIZAÇÃO ADICIONA NO ARQUIVO DE SCRIPTS DA PAGINA
const arquivoDaPagina = arquivoPorLocalizacao[window.location.pathname];
if(arquivoDaPagina){
 arquivosDeScriptPaginas.push(arquivoDaPagina)
}







// #################################################################
// ###  CARREGAMENTO DE SCRIPTS PARA HTML  #########################
// #################################################################
const todosScripts = [...arquivosDeScriptInicial, ...arquivosDeScriptPaginas];

function carregarScriptsParaHTML(script){
 return new Promise((resolve, reject) => {
  const scriptEl = document.createElement('script');
  scriptEl.src = script;
  scriptEl.onload = () => resolve(script);
  scriptEl.onerror = () => reject(new Error(`Erro ao carregar ${script}`));
  document.body.appendChild(scriptEl);
 });
}

async function carregarScripts(arquivoDeScripts, posicaoArqScript = 0) {
 const arquivoCarregado = await carregarScriptsParaHTML(arquivoDeScripts[posicaoArqScript]);
 console.log(`CARREGADO:${arquivoCarregado}`);
 if(posicaoArqScript < arquivoDeScripts.length - 1) {
  await carregarScripts(arquivoDeScripts, posicaoArqScript + 1)
 }
}

carregarScripts(todosScripts, 0)





