using Application.Bases;
using Application.Features.Orders.Rule;
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Orders.Command.DeleteOrder
{
    public class DeleteOrderCommandHandler : BaseHandler, IRequestHandler<DeleteOrderCommandRequest, Unit>
    {
        public readonly IUnitOfWork unitOfWork;
        public readonly OrderRule rule;

        public DeleteOrderCommandHandler(OrderRule rule,IUnitOfWork unitOfWork, IAutoMapper mapper, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
        {
            this.unitOfWork = unitOfWork;
            this.rule = rule;
        }
        public async Task<Unit> Handle(DeleteOrderCommandRequest request, CancellationToken cancellationToken)
        {
            IList<Order> orders = await unitOfWork.GetReadReponsitory<Order>().GetAllAsync();
            bool check = await rule.checkIdOfOrder(orders, request.id);
            if (check)
            {
                var order = await unitOfWork.GetReadReponsitory<Order>().GetAsync(x => x.Id == request.id && !x.IsDeleted);
                order.IsDeleted = true;
                await unitOfWork.GetWriteReponsitory<Order>().UpdateAsync(order);
                await unitOfWork.SaveAsync();
                
            }
            else
            {
                //ghi cai gi khi k tim thay
            }

            return Unit.Value;
        }
    }
}
