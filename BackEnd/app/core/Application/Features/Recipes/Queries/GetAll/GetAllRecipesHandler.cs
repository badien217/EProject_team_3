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

namespace Application.Features.Recipes.Queries.GetAll
{
    public class GetAllRecipesHandler : IRequestHandler<GetAllRecipesRequest, IList<GetAllRecipesReponse>>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetAllRecipesHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }

        public async Task<IList<GetAllRecipesReponse>> Handle(GetAllRecipesRequest request, CancellationToken cancellationToken)
        {
            var recipe = await _unitOfWork.GetReadReponsitory<Recipe>().GetAllAsync();
            var map = _autoMapper.Map<GetAllRecipesReponse, Recipe>(recipe);
            return map;
        }
    }
}
    

