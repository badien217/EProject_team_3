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

namespace Application.Features.iceCream.Command.UpdateIceCream
{
    public class UpdateIceCreamCommandHandler : IRequestHandler<UpdateIceCreamCommandRequest>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _autoMapper;
        public UpdateIceCreamCommandHandler(IUnitOfWork unitOfWork, IAutoMapper autoMapper)
        {
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
        }

        public async Task Handle(UpdateIceCreamCommandRequest request, CancellationToken cancellationToken)
        {
            var icecream = await _unitOfWork.GetReadReponsitory<IceCream>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);

            await _unitOfWork.GetWriteReponsitory<IceCream>().UpdateAsync(icecream);
            await _unitOfWork.SaveAsync();
        }
    }
}


    

