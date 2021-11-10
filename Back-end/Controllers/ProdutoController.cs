using System.Collections.Generic;
using Back_end.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace Back_end.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class ProdutoController: Controller
    {
        private const string  connectionDatabase = "server=localhost;port=3306;database=db_crudpuro;user=root;password=root;";
        public ProdutoController()
        {
            
        }

        [HttpGet]
        public ActionResult<List<Produto>> Get()
        {
            using(var conn = new MySqlConnection(connectionDatabase))
            {
               conn.Open();

               string sqlList = "SELECT * FROM tb_produto";

               var command =  new MySqlCommand(sqlList, conn);

               var produtosLista = new List<Produto>();

                using(var dados = command.ExecuteReader())
                {
                    while(dados.Read())
                    {
                        var produto = new Produto();
                        produto.Id = dados.GetInt32("id");
                        produto.Name = dados.GetString("nome");
                        produto.Preco = dados.GetDecimal("preco");
                        produto.DataValidade = dados.GetDateTime("dataValidacao");

                        produtosLista.Add(produto);
                    }   
                }
                return Ok(produtosLista);
            }
           
        }
    
        [HttpPost]
        public ActionResult Post([FromBody] Produto model)
        {
            using(var conn = new MySqlConnection(connectionDatabase))
            {
                string sqlCommand =  "INSERT INTO tb_produto (nome, preco, dataValidacao) VALUES (@Nome, @Preco, @DataValidacao)";

                var cmd  = new  MySqlCommand(sqlCommand, conn);

                cmd.Parameters.AddWithValue("@Nome", model.Name);
                cmd.Parameters.AddWithValue("@DataValidacao", model.DataValidade);
                cmd.Parameters.AddWithValue("@Preco", model.Preco);

                conn.Open();
                cmd.ExecuteNonQuery(); 

                return Ok("Criado com Sucesso !");
            }            
        }

        [HttpGet("{id}")]
        public ActionResult<Produto> GetById(int id)
        {
             var produto = buscaId(id);
             return Ok(produto);
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody]Produto newModel)
        {
           using(var conn = new MySqlConnection(connectionDatabase))
           {
                string sql = "UPDATE tb_produto SET nome=@Nome, dataValidacao=@DataValidacao, preco=@Preco Where id = @Id";
                
                var cmd = new MySqlCommand(sql, conn);
                
                var produto = buscaId(id);

                cmd.Parameters.AddWithValue("@Id", produto.Id);
                cmd.Parameters.AddWithValue("@Nome", newModel.Name);
                cmd.Parameters.AddWithValue("@DataValidacao",  newModel.DataValidade);
                cmd.Parameters.AddWithValue("@Preco",newModel.Preco);

                conn.Open();
                cmd.ExecuteNonQuery();

                return Ok("Deu certo update");
           }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
           using(var conn = new MySqlConnection(connectionDatabase))
           {
                string sql = "DELETE FROM tb_produto Where id = @Id";
                
                var cmd = new MySqlCommand(sql, conn);
                
                var produto = buscaId(id);

                cmd.Parameters.AddWithValue("@Id", produto.Id);
              
                conn.Open();
                cmd.ExecuteNonQuery();

                return Ok("Deu certo Delete");
           }
        }

        private Produto buscaId(int id)
        {
            using(var conn = new MySqlConnection(connectionDatabase))
            {
                conn.Open();

                string buscarId = "SELECT * FROM tb_produto WHERE id = @Id";

                var comamnd = new MySqlCommand(buscarId, conn);

                comamnd.Parameters.AddWithValue("@Id", id);

                using(var dados = comamnd.ExecuteReader())
                {
                    var produto = new Produto();

                    while(dados.Read())
                    {
                        
                        produto.Id = dados.GetInt32("id");
                        produto.Name = dados.GetString("nome");
                        produto.Preco = dados.GetDecimal("preco");
                        produto.DataValidade = dados.GetDateTime("dataValidacao");
                    }

                    return produto;
                }                
            }
        }

    }
}