using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Products.command.DeleteProduct
{
    public class DeleteProductHandler : IRequestHandler<DeleteProductRequest, Unit>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public DeleteProductHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(DeleteProductRequest request, CancellationToken cancellationToken)
        {
            var product = await _unitOfWork.GetReadReponsitory<Product>().GetAsync(x => x.Id == request.ProductId);
            product.IsDeleted = true;
            await _unitOfWork.GetWriteReponsitory<Product>().UpdateAsync(product);
            await _unitOfWork.SaveAsync();
            return Unit.Value;
        }
    }
}
