using Application.Features.Feedbacks.Queries.GetAll;
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.iceCream.Queries.GetAll
{
    public class GetAllIceCreamHandler : IRequestHandler<GetAllIceCreamRequest, IList<GetAllIceCreamReponse>>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetAllIceCreamHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }

        public async Task<IList<GetAllIceCreamReponse>> Handle(GetAllIceCreamRequest request, CancellationToken cancellationToken)
        {
            var icecream = await _unitOfWork.GetReadReponsitory<IceCream>().GetAllAsync();
            var map = _autoMapper.Map<GetAllIceCreamReponse,IceCream>(icecream);
            return map;
        }
    }
}
 

