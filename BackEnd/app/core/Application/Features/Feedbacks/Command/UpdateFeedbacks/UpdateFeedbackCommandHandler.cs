
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
    public class UpdateFeedbackCommandHandler : IRequestHandler<UpdateFeedbackCommandRRequest>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _autoMapper;
        public UpdateFeedbackCommandHandler(IUnitOfWork unitOfWork, IAutoMapper autoMapper)
        {
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
        }

        public async Task Handle(UpdateFeedbackCommandRRequest request, CancellationToken cancellationToken)
        {
            var feedback = await _unitOfWork.GetReadReponsitory<Feedback>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);

            /*
            var map = _autoMapper.Map<User, UpdateUserCommandReuquest>(request);
            var UserRole = await _unitOfWork.GetReadReponsitory<Role>().GetAsync(x => x.Id == users.Id);*/

            /*await _unitOfWork.GetWriteReponsitory<Role>().HardDeleteRangerAsync(UserRole);
            foreach (var RoleIds in request.RoleId) 
                await _unitOfWork.GetWriteReponsitory<Role>().AddAsync(new() { Id = RoleIds ,UserID = users.Id});*/
            await _unitOfWork.GetWriteReponsitory<Feedback>().UpdateAsync(feedback);
            await _unitOfWork.SaveAsync();
        }
    }
}
