using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Faqs.Queries.GetAllFaq
{
    public class GetAllFaqRequest :IRequest<IList<GetAllFaqReponse>>
    {
    }
}
