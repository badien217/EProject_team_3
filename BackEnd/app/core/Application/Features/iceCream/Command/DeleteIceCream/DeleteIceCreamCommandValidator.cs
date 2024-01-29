using Application.Features.Feedbacks.Command.DeleteFeedbacks;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.iceCream.Command.DeleteIceCream
{
    public class DeleteIceCreamCommandValidator : AbstractValidator<DeleteIceCreamCommandRequest>
    {
        public DeleteIceCreamCommandValidator() {

            RuleFor(x => x.Id).GreaterThan(0);
        } 
    }
}
