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

namespace Application.Features.Steps.Queries.GetAll
{
    public class GetAllStepsHandler : IRequestHandler<GetAllStepsRequest, IList<GetAllStepsReponse>>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetAllStepsHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }

        public async Task<IList<GetAllStepsReponse>> Handle(GetAllStepsRequest request, CancellationToken cancellationToken)
        {
            var step = await _unitOfWork.GetReadReponsitory<Step>().GetAllAsync();
            var map = _autoMapper.Map<GetAllStepsReponse, Step>(step);
            return map;
        }
    }
}