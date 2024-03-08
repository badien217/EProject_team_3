using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Carts.Queries.GetByUserId
{
    public class GetByUserIdRequest : IRequest<IList<GetByUserIdReponse>>
    {
        public Guid userID { get;set; }
    }
}
