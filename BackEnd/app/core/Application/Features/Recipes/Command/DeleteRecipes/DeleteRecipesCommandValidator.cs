using Application.Features.Feedbacks.Command.DeleteFeedbacks;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Recipes.Command.DeleteRecipes
{
    public class DeleteRecipesCommandValidator : AbstractValidator<DeleteRecipesCommandRequest>
    {
        public DeleteRecipesCommandValidator() {
            RuleFor(x => x.Id).GreaterThan(0);

        }  
    }
}
