using Application.Features.Feedbacks.Command.CreateFeedbacks;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.iceCream.Command.CreateIceCream
{
    public class CreateIceCreamCommandValidator : AbstractValidator<CreateIceCreamCommandRequest>
    {
        public CreateIceCreamCommandValidator()
        {

            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Flavorld).NotEmpty();
            RuleFor(x => x.ImageUrl).NotEmpty();
            RuleFor(x => x.Flavor).NotEmpty();

        }


    }
}

