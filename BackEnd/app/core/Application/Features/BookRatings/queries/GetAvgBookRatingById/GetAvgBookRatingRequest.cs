using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.BookRatings.queries.GetAvgBookRatingById
{
    public class GetAvgBookRatingRequest : IRequest<GetAvgBookRatingReponse>
    {
        public int BookId { get; set; }
    }
}
