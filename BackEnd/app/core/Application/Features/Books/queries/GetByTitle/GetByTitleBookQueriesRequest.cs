using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Books.queries.GetByTitle
{
    public class GetByTitleBookQueriesRequest : IRequest<GetByTitleBookQueriesReponse>
    { 
        public string Title { get; set; }
    }
}
