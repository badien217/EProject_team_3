using Application.Dtos;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.BookRatings.queries.GetAll
{
    public class GetAllBookRatingReponse
    {
        public string name { get; set; }
        public int bookId { get; set; }
        public float rating { get; set; }
        public string comment { get; set; }
        public BookDTO book { get; set; }
    }
}
