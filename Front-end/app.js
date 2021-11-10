// Metodo carregar os produtos
const carregarProdutos = async () =>
{
    const containerProdutos = document.querySelector('.itens');

    const url = "https://localhost:5001/Produto";

    let response = await fetch(url, {method: 'GET'});   

    if(response.ok)
    {
        let result = await response.json();

        result.forEach((model) => {

            const data = new Date(model.dataValidade);

            const formatter = Intl.DateTimeFormat("pt-BR", 
            {
                dateStyle:"long",
            });
            containerProdutos.insertAdjacentHTML('beforeend', 
            `
            <div class="item">  
                <div class="display-item">
                    ${model.id}
                </div>
                <div class="display-item">
                    ${model.name}
                </div>
                <div class="display-item">
                    R$ ${model.preco}
                </div>
                <div class="display-item">
                    ${formatter.format(data)}
                </div>
                <div class="display-item">
                    <a data-id="${model.id}" class="deletar">Deletar</a>
                </div>
                <div class="display-item">
                    <button type="button" id="editar" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${model.id}">
                         Editar
                    </button>
                </div>
            </div>
            `);
        });

        const botoesDeletar = document.querySelectorAll('.deletar');

        botoesDeletar.forEach((e) => e.addEventListener('click', () => {

            let id = e.getAttribute('data-id');

            excluirProduto(id);
        }));

        const botoesEditar = document.querySelectorAll('#editar');

        botoesEditar.forEach((e) => e.addEventListener('click', () => {

            let id = e.getAttribute('data-id');
            
            editarProduto(id);
        }));
        
        
    }else{
        console.log("Deu erro na api")
    }
}
// Metodo de excluir Produto
const excluirProduto = async(id) => {

    const url =  `https://localhost:5001/Produto/${id}`;

    const response = await fetch(url , 
    {
        method:'DELETE'
    });

    if(response.ok)
    {
        setTimeout(()=>{
            window.location.reload();
        }, 1000)
    }
    else{
        console.log("Deu erro ao excluir")
    }   
}
// Metodo para editar Produto
const editarProduto  = async (id) =>
{
    const url =  `https://localhost:5001/Produto/${id}`;

    const responseGET = await fetch(url , 
    {
        method:'GET'
    });

    if(responseGET.ok)
    {
        const result = await responseGET.json();

        formulario(result);

        const butonTest = document.getElementById('teste');

        butonTest.addEventListener('click', async (e)=>{

            e.preventDefault();
           
            const url =  `https://localhost:5001/Produto/${id}`;
           
            const  name = document.getElementById("item-1").value;
            const preco = document.getElementById("item-2").value;
            const dataValidade = document.getElementById("item-3").value;

            const produtoNew = 
            {
               id,
               name, 
               preco,
               dataValidade
            } 
        
            const requestOptions = {

                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(produtoNew),
              };

              const responsePUT = await fetch(url, requestOptions);

              if (responsePUT.ok) {
            
                setTimeout(()=>{
                    window.location.reload();
                }, 1000)
                
              } else {
                
                console.log("Deu muito errado mds")
              }
        })
    }
    else{
        console.log("Deu erro ao Obter id")
    } 
}

const formulario = (produto) =>
{
    document.getElementById("item-1").value = produto.name;
    document.getElementById("item-2").value = produto.preco;
    document.getElementById("item-3").value = produto.dataValidade;
   
}
// Metodo de CriarProduto
const novoProduto = async  () => {

    const url = "https://localhost:5001/Produto";

    const produto = 
    {
        name: document.getElementById('item-novo-1').value,
        preco: document.getElementById('item-novo-2').value,
        dataValidade: document.getElementById('item-novo-3').value,
    }
    const response = await fetch(url, 
        {
            method: 'POST',
            body: JSON.stringify(produto),
            headers:{
                "Content-Type": "application/json"
            } 
        }
    )

    if(response.ok)
    {
        console.log(response.json())
        setTimeout(()=>{
            window.location.reload();
        }, 1000)
    }
    else{
        console.log("Deu erro amigo")
    }

}

const iniciar =  () =>
{
    console.log("ola mundo")
     carregarProdutos(); 

    const iso = document.getElementById('formulario-novo').addEventListener('submit',  (e)=>
    {
        e.preventDefault();
        novoProduto();
    });
}



document.addEventListener('DOMContentLoaded', iniciar); 