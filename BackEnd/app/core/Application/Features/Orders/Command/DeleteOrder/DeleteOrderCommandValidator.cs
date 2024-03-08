using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Orders.Command.DeleteOrder
{
    public class DeleteOrderCommandValidator : AbstractValidator<DeleteOrderCommandRequest>
    {
        public DeleteOrderCommandValidator() {
            RuleFor(x => x.id).NotEmpty().GreaterThan(0);
        }    
    }
}
