using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Faqs.Queries.GetAllFaq
{
    public class GetAllFaqHandler : IRequestHandler<GetAllFaqRequest, IList<GetAllFaqReponse>>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetAllFaqHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<IList<GetAllFaqReponse>> Handle(GetAllFaqRequest request, CancellationToken cancellationToken)
        {
            var faq = await _unitOfWork.GetReadReponsitory<Faq>().GetAllAsync();
            var map = _autoMapper.Map<GetAllFaqReponse, Faq>(faq);
            return map;
        }
    }
}
