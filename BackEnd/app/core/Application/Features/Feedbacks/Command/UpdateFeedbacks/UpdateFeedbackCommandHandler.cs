
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Feedbacks.Command.UpdateFeedbacks
{
    public class UpdateFeedbackCommandHandler : IRequestHandler<UpdateFeedbackCommandRRequest,Unit>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _autoMapper;
        public UpdateFeedbackCommandHandler(IUnitOfWork unitOfWork, IAutoMapper autoMapper)
        {
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
        }

        public async Task<Unit> Handle(UpdateFeedbackCommandRRequest request, CancellationToken cancellationToken)
        {
            var feedback = await _unitOfWork.GetReadReponsitory<Feedback>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);
            var map = _autoMapper.Map<Feedback, UpdateFeedbackCommandRRequest>(request);
            await _unitOfWork.GetWriteReponsitory<Feedback>().UpdateAsync(map);
            await _unitOfWork.SaveAsync();
            return Unit.Value;

        }
    }
}
