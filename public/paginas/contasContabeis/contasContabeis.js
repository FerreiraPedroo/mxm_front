let contaContabilLista = [];

async function contaContabilCarregarDados() {
  const response = await fetch("http://localhost:3000/conta-contabeis", { method: "GET" })
			.then(async (response) => {
				if (response.status == 200) {
					const data = await response.json();
					contaContabilLista = data;
				}

			}).catch((error)=> {
				console.log({error});
			});
}