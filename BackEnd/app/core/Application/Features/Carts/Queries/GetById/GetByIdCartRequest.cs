using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Carts.Queries.GetById
{
    public class GetByIdCartRequest : IRequest<IList<GetByIdCartReponse>>
    {
        public int id { get; set; }
    }
}
