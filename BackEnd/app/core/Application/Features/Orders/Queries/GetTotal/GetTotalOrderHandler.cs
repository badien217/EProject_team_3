using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Orders.Queries.GetTotal
{
    public class GetTotalOrderhandler : IRequestHandler<GetTotalOrderRequest, int>
    {
        public readonly IUnitOfWork unitOfWork;
        public GetTotalOrderhandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public async Task<int> Handle(GetTotalOrderRequest request, CancellationToken cancellationToken)
        {
            var order = await unitOfWork.GetReadReponsitory<Order>().GetAllAsync(x => !x.IsDeleted);
            int count = order.Count;
            return count;
        }
    }
}
