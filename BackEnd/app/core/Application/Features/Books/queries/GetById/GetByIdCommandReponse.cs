using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Books.queries.GetById
{
    public class GetByIdCommandReponse
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime PublishedDate { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
    }
}
