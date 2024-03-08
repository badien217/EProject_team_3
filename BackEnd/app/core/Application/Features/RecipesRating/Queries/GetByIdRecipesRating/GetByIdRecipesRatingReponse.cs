using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.RecipesRating.Queries.GetByIdRecipesRating
{
    public class GetByIdRecipesRatingReponse
    {
        public Guid ProfileId { get; set; }
        public int recideId { get; set; }
        public float rating { get; set; }
        public string comment { get; set; }
    }
}
