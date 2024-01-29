using Application.Features.Feedbacks.Command.CreateFeedbacks;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Recipes.Command.CreateRecipes
{
    public class CreateRecipesCommandHandler : IRequestHandler<CreateRecipesCommandRequest>
    {
        public readonly IUnitOfWork _unitOfWork;
        public CreateRecipesCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public CreateRecipesCommandHandler() { }
        public async System.Threading.Tasks.Task Handle(CreateRecipesCommandRequest request, CancellationToken cancellationToken)
        {
            Recipe recip = new(request.Name, request.Description, request.ImageURL, request.SubMittedBy, request.Ingredients);
            await _unitOfWork.GetWriteReponsitory<Recipe>().AddAsync(recip);
            await _unitOfWork.SaveAsync();
        }
    }
}