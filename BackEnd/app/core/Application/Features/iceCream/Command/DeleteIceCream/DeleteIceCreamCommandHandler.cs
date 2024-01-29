using Application.Features.Feedbacks.Command.DeleteFeedbacks;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.iceCream.Command.DeleteIceCream
{
    public class DeleteIceCreamCommandHandler : IRequestHandler<DeleteIceCreamCommandRequest, Unit>
    {
        public readonly IUnitOfWork UnitOfWork;
        public DeleteIceCreamCommandHandler(IUnitOfWork unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(DeleteIceCreamCommandRequest request, CancellationToken cancellationToken)
        {
            var icecream = await UnitOfWork.GetReadReponsitory<IceCream>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);
            if (icecream.IsDeleted)
            {
                Console.WriteLine("khong co id");

            }
            else
            {
                icecream.IsDeleted = true;
            }
            await UnitOfWork.GetWriteReponsitory<IceCream>().UpdateAsync(icecream);
            await UnitOfWork.SaveAsync();
            return Unit.Value;

        }
    }
}
    

