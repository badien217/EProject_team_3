using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Carts.Command.UpdateCart
{
    public class UpdateCartHandler : IRequestHandler<UpdateCartRequest, Unit>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public UpdateCartHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(UpdateCartRequest request, CancellationToken cancellationToken)
        {
            var cart = await _unitOfWork.GetReadReponsitory<cartDetails>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);
            var map =  _autoMapper.Map<cartDetails,UpdateCartRequest>(request);
            await _unitOfWork.GetWriteReponsitory<cartDetails>().UpdateAsync(map);
            await _unitOfWork.SaveAsync();
            return Unit.Value;

        }
    }
}
