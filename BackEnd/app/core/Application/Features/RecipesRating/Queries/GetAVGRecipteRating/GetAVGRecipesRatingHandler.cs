using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.RecipesRating.Queries.GetAVGRecipteRating
{
    public class GetAVGRecipesRatingHandler : IRequestHandler<GetAVGRecipesRatingRequest, float>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetAVGRecipesRatingHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }

        public async Task<float> Handle(GetAVGRecipesRatingRequest request, CancellationToken cancellationToken)
        {
            float total = 0;
            float avg = 0;
            var recipesRating = await _unitOfWork.GetReadReponsitory<RecipeRating>().GetAllAsync(x => x.Id == request.Id && !x.IsDeleted);
            if(recipesRating.Count > 0)
            {
                for (int i = 0; i <recipesRating.Count;i++)
                {
                    total += recipesRating[i].rating;
                }
                avg = total / recipesRating.Count;
            }
            return avg;
        }
    }
}
