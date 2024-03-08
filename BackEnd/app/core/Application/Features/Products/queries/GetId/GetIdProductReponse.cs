using Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Products.queries.GetId
{
    public class GetIdProductReponse
    {
        public string name { get; set; }
        public FlavorDto flavor { get; set; }
        public string imageUrl { get; set; }
    }
}
