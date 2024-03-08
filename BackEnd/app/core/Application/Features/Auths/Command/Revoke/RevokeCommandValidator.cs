using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Command.Revoke
{
    public class RevokeCommandValidator : AbstractValidator<RevokeCommandRequest>
    {
       public RevokeCommandValidator() {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
        }
    }
}
