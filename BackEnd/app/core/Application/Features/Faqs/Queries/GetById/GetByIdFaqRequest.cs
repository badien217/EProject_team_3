using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Faqs.Queries.GetById
{
    public class GetByIdFaqRequest : IRequest<GetByIdFaqReponse>
    {
        public int id { get; set; }
    }
}
