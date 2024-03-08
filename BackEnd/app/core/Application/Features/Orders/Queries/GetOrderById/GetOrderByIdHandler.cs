using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Orders.Queries.GetOrderById
{
    public class GetOrderByIdHandler : IRequestHandler<GetOrderByIdRequest, GetOrderByIdReponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _mapper;
        public GetOrderByIdHandler(IUnitOfWork unitOfWork, IAutoMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<GetOrderByIdReponse> Handle(GetOrderByIdRequest request, CancellationToken cancellationToken)
        {
            var order = await _unitOfWork.GetReadReponsitory<Order>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);
            var reponse = new GetOrderByIdReponse();
            reponse.Name = order.Name;
            reponse.Phone = order.Phone;
            reponse.Email = order.Email;
            reponse.Address = order.Address;
            reponse.OrderDate = order.OrderDate; 
            reponse.Amount = order.Amount;
            reponse.PaymentOption = order.PaymentOption;
            reponse.TransactionStatus = order.TransactionStatus;
            return reponse;

        }
    }
}
