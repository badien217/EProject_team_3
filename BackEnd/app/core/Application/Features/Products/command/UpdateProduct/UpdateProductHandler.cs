using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Products.command.UpdateProduct
{
    public class UpdateProductHandler : IRequestHandler<UpdateProductRequest, Unit>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper autoMapper;
        public UpdateProductHandler(IUnitOfWork unitOfWork, IAutoMapper autoMapper)
        {
            
            this._unitOfWork = unitOfWork;
            this.autoMapper = autoMapper;
        }
        public async Task<Unit> Handle(UpdateProductRequest request, CancellationToken cancellationToken)
        {
            var product = await _unitOfWork.GetReadReponsitory<Product>().GetAsync(x => x.Id == request.Id);
            var map = autoMapper.Map<Product, UpdateProductRequest>(request);
            await _unitOfWork.GetWriteReponsitory<Product>().UpdateAsync(map);
            await _unitOfWork.SaveAsync();
            return Unit.Value;
        }
    }
}
