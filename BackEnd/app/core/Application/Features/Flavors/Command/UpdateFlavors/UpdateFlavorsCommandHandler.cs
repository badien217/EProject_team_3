using Application.Features.Users.command.UpdateUser;
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Flavors.Command.UpdateFlavors
{
    public class UpdateFlavorsCommandHandler : IRequestHandler<UpdateFlavorsCommandReuquest>
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _autoMapper;
        public UpdateFlavorsCommandHandler(IUnitOfWork unitOfWork, IAutoMapper autoMapper)
        {
            this._unitOfWork = unitOfWork;
            this._autoMapper = autoMapper;
        }

        public async Task Handle(UpdateFlavorsCommandReuquest request, CancellationToken cancellationToken)
        {

            var flavor = await _unitOfWork.GetReadReponsitory<>(Flavor).GetAsync(x => x.Id == request.Id && !x.IsDeleted);


            var map = _autoMapper.Map<Flavor, UpdateFlavorsCommandReuquest>(request);
            var flavo = await _unitOfWork.GetReadReponsitory<Role>().GetAsync(x => x.Id == flavor.Id);

            
            await _unitOfWork.GetWriteReponsitory<Flavor>().UpdateAsync(flavor);
            await _unitOfWork.SaveAsync();

        }
    }
}
