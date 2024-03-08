using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Steps.Command.CreateManyStep
{
    public class CreateManyStepsHandler : IRequestHandler<CreateManyStepsRequest,Unit>
    {

        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public CreateManyStepsHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(CreateManyStepsRequest request, CancellationToken cancellationToken)
        {
            IList<Step> ListRecipe = _autoMapper.Map<IList<Step>>(request.steps);
            await _unitOfWork.GetWriteReponsitory<Step>().AddRangerAsync(ListRecipe);
            await _unitOfWork.SaveAsync();
            return Unit.Value;
        }
    }
}
