using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Recipes.Command.CreateRecipes
{
    public class CreateRecipesCommandRequest : IRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public string SubMittedBy { get; set; }
        public string Ingredients { get; set; }

    }
}
