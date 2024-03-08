using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Books.queries.GetTotal
{
    public class GetTotalBookHandler : IRequestHandler<GetTotalBookRequest, GetTotalBookReponse>
    {
        public readonly IUnitOfWork UnitOfWork;
        public GetTotalBookHandler(IUnitOfWork unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
        }
        public async Task<GetTotalBookReponse> Handle(GetTotalBookRequest request, CancellationToken cancellationToken)
        {
            int total = await UnitOfWork.GetReadReponsitory<Book>().CountAsync(x => !x.IsDeleted);
            var reponse = new GetTotalBookReponse();
            reponse.total = total;
            return reponse;
        }
    }
}
