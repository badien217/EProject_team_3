using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.RecipesRating.Queries.GetAllRecipesRating
{
    public class GetAllRecipesRatingHandler : IRequestHandler<GetAllRecipesRatingRequest, IList<GetAllRecipesRatingReponse>>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetAllRecipesRatingHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }

        public async Task<IList<GetAllRecipesRatingReponse>> Handle(GetAllRecipesRatingRequest request, CancellationToken cancellationToken)
        {
            var recipesRating = await _unitOfWork.GetReadReponsitory<RecipeRating>().GetAllAsync(x => !x.IsDeleted);
            var map = _autoMapper.Map<GetAllRecipesRatingReponse, RecipeRating>(recipesRating);
            return map;
        }
    }
}
