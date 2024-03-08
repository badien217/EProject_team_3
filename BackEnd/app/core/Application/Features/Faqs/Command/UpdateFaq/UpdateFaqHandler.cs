using Application.Features.Books.BookRule;
using Application.Features.Books.command.UpdateBook;
using Application.Features.Books.Exception;
using Application.Features.Faqs.Exception;
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

namespace Application.Features.Faqs.Command.UpdateFaq
{
    public class UpdateFaqHandler : IRequestHandler<UpdateFaqRequest,Unit>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public readonly FaqRules _rule;
        public UpdateFaqHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork,FaqRules faqRules)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
            this._rule = faqRules;
        }
        public async Task<Unit> Handle(UpdateFaqRequest request, CancellationToken cancellationToken)
        {
            IList<Faq> faq = await _unitOfWork.GetReadReponsitory<Faq>().GetAllAsync();
            bool isIdExists = _rule.IsIdExists(faq, request.id);

            if (isIdExists)
            {
                var bookToUpdate = await _unitOfWork.GetReadReponsitory<Faq>().GetAsync(x => x.Id == request.id && !x.IsDeleted);

                if (bookToUpdate != null)
                {
                    var map = _autoMapper.Map<Faq, UpdateFaqRequest>(request);
                    await _unitOfWork.GetWriteReponsitory<Faq>().UpdateAsync(map);
                    await _unitOfWork.SaveAsync();
                }
                else
                {
                    throw new FaqNotFound();
                }
            }
            else
            {
                throw new FaqNotFound();
            }

            return Unit.Value;
        }
    }
}
