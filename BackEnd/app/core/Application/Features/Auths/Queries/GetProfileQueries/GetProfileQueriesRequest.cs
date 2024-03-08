using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Queries.GetProfileQueries
{
    public class GetProfileQueriesRequest : IRequest<GetProfileQueriesReponse>
    {
        [DefaultValue("802735F1-1CB9-4246-05C4-08DC317D93AB")]
        public Guid UserId { get; set; }
    }
}
