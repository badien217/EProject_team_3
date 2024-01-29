using Application.Features.Feedbacks.Command.DeleteFeedbacks;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Steps.Command.DeleteSteps
{
    public class DeleteStepsCommandValidator : AbstractValidator<DeleteStepsCommandRequest>
    {
        public DeleteStepsCommandValidator() {
            RuleFor(x => x.Id).GreaterThan(0);

        }
    }
}
