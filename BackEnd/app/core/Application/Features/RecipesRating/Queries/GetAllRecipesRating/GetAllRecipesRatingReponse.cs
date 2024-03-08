using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.RecipesRating.Queries.GetAllRecipesRating
{
    public class GetAllRecipesRatingReponse
    {
        public Guid ProfileId { get; set; }
        public int recideId { get; set; }
        public float rating { get; set; }
        public string comment { get; set; }
    }
}
