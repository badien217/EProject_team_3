using Application.Features.Books.BookRule;
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.RecipesRating.Command.CreateRecipesRating
{
    public class CreateRecipesRatingHandler : IRequestHandler<CreateRecipesRatingRequest, Unit>
    {
        public readonly IUnitOfWork _unitOfWork;
        public CreateRecipesRatingHandler(IUnitOfWork unitOfWork, IAutoMapper mapper, IHttpContextAccessor httpContextAccessor, BookRules bookRules) : base(mapper, unitOfWork, httpContextAccessor)
        {
            _unitOfWork = unitOfWork;


        }
        public async Task<Unit> Handle(CreateRecipesRatingRequest request, CancellationToken cancellationToken)
        {
            RecipeRating recipeRating = new(request.ProfileId, request.recideId, request.rating, request.comment);
            await _unitOfWork.GetWriteReponsitory<RecipeRating>().AddAsync(recipeRating);
            await _unitOfWork.SaveAsync();
            return Unit.Value;
        }
    }
}
