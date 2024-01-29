using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Flavors.Queries.GetAll
{
    public class GetAllFlavorsRequest : IRequest<IList<GetAllFlavorsReponse>>
    {

    }
}
