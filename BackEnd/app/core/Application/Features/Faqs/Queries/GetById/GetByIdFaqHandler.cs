using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Faqs.Queries.GetById
{
    public class GetByIdFaqHandler : IRequestHandler<GetByIdFaqRequest, GetByIdFaqReponse>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetByIdFaqHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<GetByIdFaqReponse> Handle(GetByIdFaqRequest request, CancellationToken cancellationToken)
        {
            var faqbyId = await _unitOfWork.GetReadReponsitory<Faq>().GetAsync(x => x.Id == request.id && !x.IsDeleted);
            var reponse = new GetByIdFaqReponse();
            reponse.question = faqbyId.question;
            reponse.answer = faqbyId.answer;
            return reponse;
        }
    }
}
