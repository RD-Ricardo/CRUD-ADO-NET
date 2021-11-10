using System;

namespace Back_end.Models
{
    public class Produto
    {
        public int Id { get; set; }
        public string  Name { get; set; }
        public decimal Preco { get; set; }
        public DateTime DataValidade { get; set; }
    }
}