using Application.Features.Feedbacks.Command.CreateFeedbacks;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Steps.Command.CreateSteps
{
    public class CreateStepsCommandValidator : AbstractValidator<CreateStepsCommandRequest>
    {
        public CreateStepsCommandValidator()
        {
            RuleFor(x => x.Content).NotEmpty();
            RuleFor(x => x.ImageUrl).NotEmpty();
            RuleFor(x => x.RecipeId).NotEmpty();
         
        }
    }
}
