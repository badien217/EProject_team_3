using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Carts.Command.CreateCart
{
    public class CreateCartRequest : IRequest<Unit>
    {
        public Guid UserId { get; set; }
        public int CartId { get; set; }
        public IList<int> Bookid { get; set; }
        public int quantity { get; set; }
        
    }
}
