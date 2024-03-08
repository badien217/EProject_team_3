using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Products.queries.GetTotal
{
    public class GetTotalProductHandler : IRequestHandler<GetTotalProductRequest, int>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetTotalProductHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<int> Handle(GetTotalProductRequest request, CancellationToken cancellationToken)
        {
            var product = await _unitOfWork.GetReadReponsitory<Product>().GetAllAsync(x => !x.IsDeleted);
            int count = product.Count;
            return count;
        }
    }
}
