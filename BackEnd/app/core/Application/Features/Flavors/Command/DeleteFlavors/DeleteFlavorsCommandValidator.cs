using Application.Features.Users.command.DeleteUser;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Flavors.Command.DeleteFlavors
{
    public class DeleteFlavorsCommandValidator : AbstractValidator<DeleteFlavorsCommandRequest>
    {
        public DeleteFlavorsCommandValidator() {
            RuleFor(x => x.Id).GreaterThan(0);

        }
    }
}
