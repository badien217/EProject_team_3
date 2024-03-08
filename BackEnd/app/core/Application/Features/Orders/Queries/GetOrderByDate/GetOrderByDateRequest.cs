using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Orders.Queries.GetOrderByDate
{
    public class GetOrderByDateRequest :IRequest<IList<GetOrderByDateReponse>>
    {
        public DateTime DateTime { get; set; }
    }
}
