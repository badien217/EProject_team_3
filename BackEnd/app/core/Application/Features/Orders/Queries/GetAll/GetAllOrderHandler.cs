using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Orders.Queries.GetAll
{
    public class GetAllOrderHandler : IRequestHandler<GetAllOrderRequest, IList<GetAllOrderReponse>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _mapper;
        public GetAllOrderHandler(IUnitOfWork unitOfWork, IAutoMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<IList<GetAllOrderReponse>> Handle(GetAllOrderRequest request, CancellationToken cancellationToken)
        {
            var order = await _unitOfWork.GetReadReponsitory<Order>().GetAllAsync( x => !x.IsDeleted);
            var map = _mapper.Map<GetAllOrderReponse, Order>(order);
            return map;

        }
    }
}
