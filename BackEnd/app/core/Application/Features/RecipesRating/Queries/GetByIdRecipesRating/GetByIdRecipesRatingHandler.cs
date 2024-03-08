using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.RecipesRating.Queries.GetByIdRecipesRating
{
    public class GetByIdRecipesRatingHandler : IRequestHandler<GetByIdRecipesRatingRequest, GetByIdRecipesRatingReponse>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetByIdRecipesRatingHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }

        public async Task<GetByIdRecipesRatingReponse> Handle(GetByIdRecipesRatingRequest request, CancellationToken cancellationToken)
        {
            var recipesRating = await _unitOfWork.GetReadReponsitory<RecipeRating>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);
            var reponse = new GetByIdRecipesRatingReponse();
            reponse.ProfileId = recipesRating.ProfileId;
            reponse.recideId = recipesRating.recideId;
            reponse.rating = recipesRating.rating;  
            reponse.comment = recipesRating.comment;
            return reponse;
        }
    }
}
