using Application.Features.Feedbacks.Command.CreateFeedbacks;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Application.Features.iceCream.Command.CreateIceCream
{
    public class CreateIceCreamCommandValidator : AbstractValidator<CreateIceCreamCommandRequest>
    {
        public CreateIceCreamCommandValidator()
        {

            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Flavorld).NotEmpty();
            RuleFor(x => x.ImageUrl).Must(x => Regex.IsMatch(x, @"^.+(\.jpg|\.png)$"))
            .WithMessage("Hình ảnh chỉ được phép có đuôi .jpg hoặc .png");
            RuleFor(x => x.Flavor).NotEmpty();

        }


    }
}

