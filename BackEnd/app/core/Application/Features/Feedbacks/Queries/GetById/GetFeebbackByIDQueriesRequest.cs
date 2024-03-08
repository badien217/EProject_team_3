using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Feedbacks.Queries.GetById
{
    public class GetFeebbackByIDQueriesRequest : IRequest<GetFeebbackByIDQueriesReponse>
    {
        public string name;
    }
}
