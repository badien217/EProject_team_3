using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Command.SendEmail
{
    public class SendEmailCommandAuthsValidator :AbstractValidator<SendEmailCommandAuthsRequest>
    {
        public SendEmailCommandAuthsValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress().WithName("vui long check email");
        }
    }
}
