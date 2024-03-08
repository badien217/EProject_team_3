using Application.Dtos;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Carts.Queries.GetAllCart
{
    public class GetAllCartReponse
    {
        public int cartId { get; set; }     
        public BookDTO book { get; set; }
        public float Quantity { get; set; }
    }
}
