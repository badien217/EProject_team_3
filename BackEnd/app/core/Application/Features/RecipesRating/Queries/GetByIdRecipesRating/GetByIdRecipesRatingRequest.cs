using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.RecipesRating.Queries.GetByIdRecipesRating
{
    public class GetByIdRecipesRatingRequest : IRequest<GetByIdRecipesRatingReponse>
    {
        public int Id { get; set; }
    }
}
