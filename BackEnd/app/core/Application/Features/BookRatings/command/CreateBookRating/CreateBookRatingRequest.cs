using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.BookRatings.command.CreateBookRating
{
    public class CreateBookRatingRequest : IRequest<Unit>
    {
        public string name { get; set; }
        public int bookId { get; set; }
        public float rating { get; set; }
        public string comment { get; set; }
    }
}
 