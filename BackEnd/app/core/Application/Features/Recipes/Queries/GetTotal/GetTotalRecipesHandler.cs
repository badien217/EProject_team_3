using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Recipes.Queries.GetTotal
{
    public class GetTotalRecipesHandler : IRequestHandler<GetTotalRecipesRequest, int>
    {
        public readonly IUnitOfWork unitOfWork;
        public GetTotalRecipesHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public async Task<int> Handle(GetTotalRecipesRequest request, CancellationToken cancellationToken)
        {
            var recipes = await unitOfWork.GetReadReponsitory<Recipe>().GetAllAsync(x => !x.IsDeleted);
            int count = recipes.Count;
            return count;
        }
    }
}
