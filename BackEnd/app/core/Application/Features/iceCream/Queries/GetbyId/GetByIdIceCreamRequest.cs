using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.iceCream.Queries.GetbyId
{
    public class GetByIdIceCreamRequest : IRequest<GetByIdIceCreamReponse>
    {
        public int Id { get; set; }
    }
}
