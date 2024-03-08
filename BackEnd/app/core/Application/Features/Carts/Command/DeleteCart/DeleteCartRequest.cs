using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Carts.Command.DeleteCart
{
    public class DeleteCartRequest : IRequest<Unit>
    {
        public int id { get; set; }
    }
}
