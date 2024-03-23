﻿using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Recipes.Command.UpdateRecipes
{
    public class UpdateRecipesCommandRequest : IRequest<Unit>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public IFormFile ImageURL { get; set; }
        public string SubMittedBy { get; set; }
        public string Ingredients { get; set; }



    }
}
