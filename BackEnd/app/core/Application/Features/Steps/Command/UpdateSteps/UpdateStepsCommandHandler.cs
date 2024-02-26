using Application.Features.Feedbacks.Command.UpdateFeedbacks;
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Steps.Command.UpdateSteps
{
    public class UpdateStepsCommandHandler : IRequestHandler<UpdateStepsCommandRequest>
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _autoMapper;
        public UpdateStepsCommandHandler(IUnitOfWork unitOfWork, IAutoMapper autoMapper)
        {
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
        }

        public async Task Handle(UpdateStepsCommandRequest request, CancellationToken cancellationToken)
        {
            var step = await _unitOfWork.GetReadReponsitory<Step>().GetAsync(x => x.Id == request.Id && !x.IsDeleted); 
            await _unitOfWork.GetWriteReponsitory<Step>().UpdateAsync(step);
            await _unitOfWork.SaveAsync();
        }
    }
}
