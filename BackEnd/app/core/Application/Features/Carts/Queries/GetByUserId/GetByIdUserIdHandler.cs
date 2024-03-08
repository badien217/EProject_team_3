using Application.Dtos;
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Carts.Queries.GetByUserId
{
    public class GetByIdUserIdHandler : IRequestHandler<GetByUserIdRequest, IList<GetByUserIdReponse>>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetByIdUserIdHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<IList<GetByUserIdReponse>> Handle(GetByUserIdRequest request, CancellationToken cancellationToken)
        {
            var cart = await _unitOfWork.GetReadReponsitory<Cart>().GetAllAsync(x => x.ProfileId == request.userID);
            var cartDetailList = new List<cartDetails>();
            foreach(var carts in cart)
            {
            var cartDetail = await _unitOfWork.GetReadReponsitory<cartDetails>().GetAllAsync(y => y.cartId == carts.Id,include:x => x.Include(b => b.book));
            cartDetailList.AddRange(cartDetail);
            var bookdto = _autoMapper.Map<BookDTO, Book>(new Book());
            }

            var responseList = _autoMapper.Map<IList<GetByUserIdReponse>>(cartDetailList);



            return responseList;
        }
    }
}
