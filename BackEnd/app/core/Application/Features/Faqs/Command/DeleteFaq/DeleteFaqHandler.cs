using Application.Features.Faqs.Rule;
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Faqs.Command.DeleteFaq
{
    public class DeleteFaqHandler : IRequestHandler<DeleteFaqRequest, Unit>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public readonly FaqRules _rule;
        public DeleteFaqHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork, FaqRules faqRules)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
            this._rule = faqRules;
        }
        public async Task<Unit> Handle(DeleteFaqRequest request, CancellationToken cancellationToken)
        {
            var faq = await _unitOfWork.GetReadReponsitory<Faq>().GetAsync(x => x.Id == request.Id);
            faq.IsDeleted = true;
            await _unitOfWork.GetWriteReponsitory<Faq>().UpdateAsync(faq);
            await _unitOfWork.SaveAsync();
            return Unit.Value;
        }
    }
}
