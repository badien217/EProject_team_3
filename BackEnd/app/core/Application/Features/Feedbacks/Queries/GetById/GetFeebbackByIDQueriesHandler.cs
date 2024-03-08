using Application.Features.Books.command.UpdateBook;
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Feedbacks.Queries.GetById
{
    public class GetFeebbackByIDQueriesHandler : IRequestHandler<GetFeebbackByIDQueriesRequest, GetFeebbackByIDQueriesReponse>
    {
        public readonly IUnitOfWork unitOfWork;
        public readonly IAutoMapper autoMapper;
        public GetFeebbackByIDQueriesHandler(IUnitOfWork unitOfWork, IAutoMapper autoMapper)
        {
            this.unitOfWork = unitOfWork;
            this.autoMapper = autoMapper;
        }
        public async Task<GetFeebbackByIDQueriesReponse> Handle(GetFeebbackByIDQueriesRequest request, CancellationToken cancellationToken)
        {
          string feedbackNameToFind = request.name;
            var feedback = await unitOfWork.GetReadReponsitory<Feedback>().Find(x => x.Name == feedbackNameToFind  );
            return new GetFeebbackByIDQueriesReponse
            {
                Feedback = (Feedback)feedback
               
            };
        }
    }
}
