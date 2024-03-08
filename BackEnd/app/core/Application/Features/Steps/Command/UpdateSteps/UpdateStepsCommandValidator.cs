using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Application.Features.Steps.Command.UpdateSteps
{
    public class UpdateStepsCommandValidator : AbstractValidator<UpdateStepsCommandRequest>
    {
        public UpdateStepsCommandValidator() {
            RuleFor(x => x.Content).NotEmpty();
            RuleFor(x => x.ImageUrl).Must(x => Regex.IsMatch(x, @"^.+(\.jpg|\.png)$"))
            .WithMessage("Hình ảnh chỉ được phép có đuôi .jpg hoặc .png");

            RuleFor(x => x.RecipeId).NotEmpty();
        }
    }
}
