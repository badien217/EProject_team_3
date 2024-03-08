using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Products.queries.GetId
{
    public class GetIdProductRequest : IRequest<GetIdProductReponse>
    {
        public int Id { get; set; }
    }
}
