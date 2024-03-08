using Application.Bases;
using Application.Features.Books.BookRule;
using Application.Interfaces.AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using persistence.Interfaces.UnitOfWorks;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Orders.Command.CreateOrder
{
    public class CreateOrderCommandHandler : BaseHandler, IRequestHandler<CreateOrderCommandRequest,Unit>
    {
        public IUnitOfWork _unitOfWork;
        public BookRules _bookRules;


        public CreateOrderCommandHandler(IUnitOfWork unitOfWork, IAutoMapper mapper, IHttpContextAccessor httpContextAccessor, BookRules bookRules) : base(mapper, unitOfWork, httpContextAccessor)
        {
            _unitOfWork = unitOfWork;
            _bookRules = bookRules;

        }

        public async Task<Unit> Handle(CreateOrderCommandRequest request, CancellationToken cancellationToken)
        {
            Order order = new(request.Name,request.Email,request.Phone,request.Address,request.Amount,
                request.PaymentOption,request.TransactionStatus,request.OrderDate);
            await unitOfWork.GetWriteReponsitory<Order>().AddAsync(order);
            if(await unitOfWork.SaveAsync() > 0)
            {
                foreach (var bookId in request.BookId)
                {
                    await unitOfWork.GetWriteReponsitory<OrderDetail>().AddAsync(new()
                    {
                        OrderId = order.Id,
                        BookId = bookId,
                    });
                    
                }
            await unitOfWork.SaveAsync();
            }
            return Unit.Value;
        }
    }
}
