using Application.Dtos;
using Application.Features.Carts.Queries.GetAllCart;
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

namespace Application.Features.Carts.Queries.GetById
{
    public class GetByIdCartHandler : IRequestHandler<GetByIdCartRequest, IList<GetByIdCartReponse>>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetByIdCartHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<IList<GetByIdCartReponse>> Handle(GetByIdCartRequest request, CancellationToken cancellationToken)
        {
            var cart = await _unitOfWork.GetReadReponsitory<cartDetails>().GetAllAsync(
                x => !x.IsDeleted && x.Id == request.id, include: y => y.Include(b => b.book)
                );
            var book = _autoMapper.Map<BookDTO, Book>(new Book());
            var map = _autoMapper.Map<GetByIdCartReponse, cartDetails>(cart);
            return map;
        }
    }
}
