using Application.Features.Users.command.DeleteUser;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Flavors.Command.DeleteFlavors
{
    public class DeleteFlavorsCommandHandler : IRequestHandler<DeleteFlavorsCommandRequest, Unit>
    {
        public readonly IUnitOfWork unitOfWork;
        public DeleteFlavorsCommandHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(DeleteUserCommandRequest request, CancellationToken cancellationToken)
        {
            var flavor = await unitOfWork.GetReadReponsitory<Book>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);
            flavor.IsDeleted = true;

            await unitOfWork.GetWriteReponsitory<Book>().UpdateAsync(flavor);
            await unitOfWork.SaveAsync();

            return Unit.Value;
        }
    }
}
