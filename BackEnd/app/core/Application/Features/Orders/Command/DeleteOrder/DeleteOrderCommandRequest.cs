using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Orders.Command.DeleteOrder
{
    public class DeleteOrderCommandRequest : IRequest<Unit>
    {
        public int id { get; set; }
    }
}
