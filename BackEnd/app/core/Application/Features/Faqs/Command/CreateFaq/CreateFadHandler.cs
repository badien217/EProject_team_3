using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Faqs.Command.CreateFaq
{
    public class CreateFadHandler : IRequestHandler<CreateFadRequest, Unit>
    {
        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public CreateFadHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(CreateFadRequest request, CancellationToken cancellationToken)
        {
            Faq faq = new(request.question, request.answer);
            await _unitOfWork.GetWriteReponsitory<Faq>().AddAsync(faq);
            await _unitOfWork.SaveAsync();
            return Unit.Value;
        }
    }
}
