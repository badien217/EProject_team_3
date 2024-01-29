using Application.Features.Users.command.CreateUser;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore.Infrastructure;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Flavors.Command.CreateFlavors
{
    public class CreateFlavorsCommandHandler : IRequestHandler<CreateFlavorsCommandRequest>
    {
        public IUnitOfWork _unitOfWork;
        public CreateFlavorsCommandHandler() { }
        public CreateFlavorsCommandHandler(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;

        }
        public async System.Threading.Tasks.Task Handle(CreateFlavorsCommandRequest request, CancellationToken cancellationToken)
        {
            Flavor flavorCustomer = new(request.Name, request.ImageUrl);
            await _unitOfWork.GetWriteReponsitory<Flavor>().AddAsync(flavorCustomer);
            await _unitOfWork.SaveAsync();


        }


    }
}
