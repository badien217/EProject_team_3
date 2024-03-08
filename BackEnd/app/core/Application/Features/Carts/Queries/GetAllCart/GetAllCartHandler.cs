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

namespace Application.Features.Carts.Queries.GetAllCart
{
    public class GetAllCartHandler : IRequestHandler<GetAllCartRequest, IList<GetAllCartReponse>>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetAllCartHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<IList<GetAllCartReponse>> Handle(GetAllCartRequest request, CancellationToken cancellationToken)
        {
            var cart = await _unitOfWork.GetReadReponsitory<cartDetails>().GetAllAsync(
                x => !x.IsDeleted,include: y => y.Include(b => b.book)
                );
            var book = _autoMapper.Map<BookDTO, Book>(new Book());
            var map = _autoMapper.Map<GetAllCartReponse, cartDetails>(cart);
            return map;

        }
    }
}
