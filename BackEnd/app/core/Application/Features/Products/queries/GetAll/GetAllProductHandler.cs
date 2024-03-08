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

namespace Application.Features.Products.queries.GetAll
{
    public class GetAllProductHandler : IRequestHandler<GetAllProductRequest, IList<GetAllProductReponse>>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetAllProductHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<IList<GetAllProductReponse>> Handle(GetAllProductRequest request, CancellationToken cancellationToken)
        {
            IList<Product> product = await _unitOfWork.GetReadReponsitory<Product>().GetAllAsync(x=> !x.IsDeleted
            ,include: y=> y.Include(b => b.Flavor)
            );
            var flavor = _autoMapper.Map<FlavorDto ,Flavor>(new Flavor());
            var map = _autoMapper.Map<GetAllProductReponse, Product>(product);
            return map;
        }
    }
}
