using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Products.command.CreateProduct
{
    public class CreateProductRequest : IRequest<Unit>
    {
        public string name { get; set; }
        public int FlavorId { get; set; }
        public string imageUrl { get; set; }
    }
}
