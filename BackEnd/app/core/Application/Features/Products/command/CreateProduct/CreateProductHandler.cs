using Domain.Entities;
using MediatR;
using Microsoft.Identity.Client;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Products.command.CreateProduct
{
    public class CreateProductHandler : IRequestHandler<CreateProductRequest, Unit>
    {
        public readonly IUnitOfWork _unitOfWork;
        public CreateProductHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(CreateProductRequest request, CancellationToken cancellationToken)
        {
            Product product = new(request.name, request.FlavorId, request.imageUrl);
            await _unitOfWork.GetWriteReponsitory<Product>().AddAsync(product);
            await _unitOfWork.SaveAsync();
            return Unit.Value;
        }
    }
}
