using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.RecipesRating.Command.CreateRecipesRating
{
    public class CreateRecipesRatingRequest :IRequest<Unit>
    {
        public Guid ProfileId { get; set; }
        public int recideId { get; set; }
        public float rating { get; set; }
        public string comment { get; set; }
    }
}
