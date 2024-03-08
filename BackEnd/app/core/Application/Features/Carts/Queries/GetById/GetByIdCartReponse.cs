using Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Carts.Queries.GetById
{
    public class GetByIdCartReponse
    {
        public int cartId { get; set; }
        public BookDTO book { get; set; }
        public float Quantity { get; set; }
    }
}
