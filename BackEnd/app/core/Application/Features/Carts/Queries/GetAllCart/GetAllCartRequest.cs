using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Carts.Queries.GetAllCart
{
    public class GetAllCartRequest : IRequest<IList<GetAllCartReponse>>
    {
    }
}
