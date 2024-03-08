using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Carts.Command.CreateCart
{
    public class CreateCartHandler : IRequestHandler<CreateCartRequest, Unit>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public CreateCartHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(CreateCartRequest request, CancellationToken cancellationToken)
        {
            var cart = new Cart();
            cart.ProfileId = request.UserId;
            if (request.Bookid.Count > 0)
            {
                for(int bookId = 0; bookId < request.Bookid.Count; bookId++) {
                    cartDetails cartDetail = new(request.CartId, cart, request.Bookid[bookId], request.quantity);
                    await _unitOfWork.GetWriteReponsitory<cartDetails>().AddAsync(cartDetail);
                     
                }
                await _unitOfWork.SaveAsync(); 
            }
            return Unit.Value;
        }
    }
}
