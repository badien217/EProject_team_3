using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Feedbacks.Queries.GetTotal
{
    public class GetTotalFeedBackHandler : IRequestHandler<GetTotalFeedBackRequest, int>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetTotalFeedBackHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<int> Handle(GetTotalFeedBackRequest request, CancellationToken cancellationToken)
        {
            var feedback = await _unitOfWork.GetReadReponsitory<Feedback>().GetAllAsync(x => !x.IsDeleted);
            int count = feedback.Count;
            return count;
        }
    }
}
