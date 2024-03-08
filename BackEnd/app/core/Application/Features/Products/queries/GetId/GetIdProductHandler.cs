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

namespace Application.Features.Products.queries.GetId
{
    public class GetIdProductHandler : IRequestHandler<GetIdProductRequest, GetIdProductReponse>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetIdProductHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<GetIdProductReponse> Handle(GetIdProductRequest request, CancellationToken cancellationToken)
        {
            var product = await _unitOfWork.GetReadReponsitory<Product>().GetAsync(
                x => x.Id == request.Id && !x.IsDeleted, include: y => y.Include(b => b.Flavor)
                );
            var flavor = _autoMapper.Map<FlavorDto, Flavor>(new Flavor());
            var map = _autoMapper.Map<GetIdProductReponse, Product>(product);
            return map;
        }
    }
}
