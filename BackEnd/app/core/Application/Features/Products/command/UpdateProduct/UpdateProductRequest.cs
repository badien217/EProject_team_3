using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Products.command.UpdateProduct
{
    public class UpdateProductRequest : IRequest<Unit>
    {
        public int Id { get; set; }
        public string name { get; set; }
        public int FlavorId { get; set; }
        public string imageUrl { get; set; }
    }
}
