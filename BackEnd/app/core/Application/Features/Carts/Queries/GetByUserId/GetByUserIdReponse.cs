using Application.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Carts.Queries.GetByUserId
{
    public class GetByUserIdReponse 
    {
        public int cartId { get; set; }
        public BookDTO book { get; set; }
        public float Quantity { get; set; }
    }
}
