using Application.Features.Feedbacks.Command.CreateFeedbacks;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Steps.Command.CreateSteps
{
    public class CreateStepsCommandHandler : IRequestHandler<CreateStepsCommandRequest>
    {

        public readonly IUnitOfWork _unitOfWork;
        public CreateStepsCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public CreateStepsCommandHandler() { }
        public async System.Threading.Tasks.Task Handle(CreateStepsCommandRequest request, CancellationToken cancellationToken)
        {
            Step steps = new(request.Content, request.ImageUrl, request.RecipeId);
            await _unitOfWork.GetWriteReponsitory<Step>().AddAsync(steps);
            await _unitOfWork.SaveAsync();
        }
    }
}

   

