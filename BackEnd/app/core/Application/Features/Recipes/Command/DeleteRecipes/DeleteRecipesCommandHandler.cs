using Application.Features.Feedbacks.Command.DeleteFeedbacks;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Recipes.Command.DeleteRecipes
{
    public class DeleteRecipesCommandHandler : IRequestHandler<DeleteRecipesCommandRequest, Unit>
    {
        public readonly IUnitOfWork UnitOfWork;
        public DeleteRecipesCommandHandler(IUnitOfWork unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(DeleteRecipesCommandRequest request, CancellationToken cancellationToken)
        {
            var recipes = await UnitOfWork.GetReadReponsitory<Recipe>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);
            if (!recipes.IsDeleted)
            {
                Console.WriteLine("khong co id");

            }
            else
            {
                recipes.IsDeleted = true;
            }
            await UnitOfWork.GetWriteReponsitory<Recipe>().UpdateAsync(recipes);
            await UnitOfWork.SaveAsync();
            return Unit.Value;

        }
    }
}
