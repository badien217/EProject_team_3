using Application.Features.Feedbacks.Command.CreateFeedbacks;
using Application.Features.Flavors.Command.CreateFlavors;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.iceCream.Command.CreateIceCream
{
    public class CreateIceCteamCommandHandler : IRequestHandler<CreateIceCreamCommandRequest>
    {
        public readonly IUnitOfWork _unitOfWork;
        public CreateIceCteamCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public CreateIceCteamCommandHandler() { }
        public async System.Threading.Tasks.Task Handle(CreateIceCreamCommandRequest request, CancellationToken cancellationToken)
        {
            IceCream icecrem = new(request.Name, request.Flavorld, request.ImageUrl);
            await _unitOfWork.GetWriteReponsitory<IceCream>().AddAsync(icecrem);
            await _unitOfWork.SaveAsync();
        }
    }
}

