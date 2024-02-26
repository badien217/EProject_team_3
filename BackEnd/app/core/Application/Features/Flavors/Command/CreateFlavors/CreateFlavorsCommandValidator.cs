using Application.Features.Users.command.CreateUser;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Flavors.Command.CreateFlavors
{
    public class CreateFlavorsCommandValidator : AbstractValidator<CreateFlavorsCommandRequest>
    {
        public CreateFlavorsCommandValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.ImageUrl).NotEmpty();
            RuleFor(x => x.iceCream).NotEmpty();
           
        }


    }
}

