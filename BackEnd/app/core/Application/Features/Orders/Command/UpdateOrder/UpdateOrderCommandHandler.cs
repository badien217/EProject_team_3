using Application.Bases;
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using EllipticCurve.Utils;
using MediatR;
using Microsoft.AspNetCore.Http;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Orders.Command.UpdateOrder
{
    public class UpdateOrderCommandHandler : BaseHandler, IRequestHandler<UpdateOrderCommandRequest, Unit>
    {
        public UpdateOrderCommandHandler(IAutoMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
        {
        }
        public async Task<Unit> Handle(UpdateOrderCommandRequest request, CancellationToken cancellationToken)
        {
            var orders = await unitOfWork.GetReadReponsitory<Order>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);
            var map = mapper.Map<Order, UpdateOrderCommandRequest>(request); 
            var orderdetail = await unitOfWork.GetReadReponsitory<OrderDetail>().GetAllAsync(x => x.OrderId == request.Id && !x.IsDeleted);
            await unitOfWork.GetWriteReponsitory<OrderDetail>().HardDeleteRangerAsync(orderdetail);
            foreach(var bookId in request.BookId)
                await unitOfWork.GetWriteReponsitory<OrderDetail>().AddAsync(new() {
                    OrderId = orders.Id,
                    BookId = bookId
                });
            await unitOfWork.GetWriteReponsitory<Order>().UpdateAsync(map);
            await unitOfWork.SaveAsync();
            return Unit.Value;
        }
    }
}
