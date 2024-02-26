using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Orders.Command.CreateOrder
{
    public class CreateOrderCommandValidator :AbstractValidator<CreateOrderCommandRequest>
    {
        public CreateOrderCommandValidator() {
            RuleFor(x => x.Email).NotEmpty();
        }
    }
}
