using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Books.queries.GetById
{
    public class GetByIdCommandRequest : IRequest<GetByIdCommandReponse>
    {
        public int id {  get; set; }
    }
}
