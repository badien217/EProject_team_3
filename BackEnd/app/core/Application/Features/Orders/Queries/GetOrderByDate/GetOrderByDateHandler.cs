using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Orders.Queries.GetOrderByDate
{
    public class GetOrderByDateHandler : IRequestHandler<GetOrderByDateRequest,IList<GetOrderByDateReponse>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _mapper;
        public GetOrderByDateHandler(IUnitOfWork unitOfWork, IAutoMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IList<GetOrderByDateReponse>> Handle(GetOrderByDateRequest request, CancellationToken cancellationToken)
        {
            var order = await _unitOfWork.GetReadReponsitory<Order>().GetAllAsync(x => x.OrderDate == request.DateTime && !x.IsDeleted);
            var map = _mapper.Map<GetOrderByDateReponse, Order>(order);
            return map;
        }
    }
}
