using Application.Bases;
using Application.Features.Feedbacks.Exception;
using Application.Features.Steps.Exception;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Steps.StepsRules
{
    public class StepsRules : BaseRule
    {
        public Task StepsRecipeMostNotBeSame(IList<Step> steps, string requesRecipe)
        {

            if (steps.Any(x => x.recipe == requesRecipe)) throw new StepsRecipeNotBeSameException();
            return Task.CompletedTask;

        }
        public async Task<bool> StepsRecipeNotFound(IList<Step> steps, string requesRecipe)
        {
            if (steps.Any(x => x.recipe != requesRecipe))
            {
                return true;
            }
            return false;

        }
    }
}
    

