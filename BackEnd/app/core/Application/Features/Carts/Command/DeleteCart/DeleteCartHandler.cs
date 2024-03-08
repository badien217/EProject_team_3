using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Carts.Command.DeleteCart
{
    public class DeleteCartHandler : IRequestHandler<DeleteCartRequest, Unit>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public DeleteCartHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(DeleteCartRequest request, CancellationToken cancellationToken)
        {
            var cart = await _unitOfWork.GetReadReponsitory<Cart>().GetAsync(x => x.Id == request.id && !x.IsDeleted);
            cart.IsDeleted = true;
            await _unitOfWork.GetWriteReponsitory<Cart>().UpdateAsync(cart);
            await _unitOfWork.SaveAsync();
            return Unit.Value;
        }
    }
}
