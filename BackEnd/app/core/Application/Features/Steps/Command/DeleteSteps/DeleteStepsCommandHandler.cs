using Application.Features.Feedbacks.Command.DeleteFeedbacks;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Steps.Command.DeleteSteps
{
    public class DeleteStepsCommandHandler : IRequestHandler<DeleteStepsCommandRequest, Unit>
    {
        public readonly IUnitOfWork UnitOfWork;
        public DeleteStepsCommandHandler(IUnitOfWork unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(DeleteStepsCommandRequest request, CancellationToken cancellationToken)
        {
            var steps = await UnitOfWork.GetReadReponsitory<Step>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);
            if (!steps.IsDeleted)
            {
                Console.WriteLine("");

            }
            else
            {
                steps.IsDeleted = true;
            }
            await UnitOfWork.GetWriteReponsitory<Step>().UpdateAsync(steps);
            await UnitOfWork.SaveAsync();
            return Unit.Value;

        }
    }
}
 

