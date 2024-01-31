
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Books.command.UpdateBook
{
    public class UpdateBookCommandHandler : IRequestHandler<UpdateBookCommandReuquest>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _autoMapper;
        public UpdateBookCommandHandler(IUnitOfWork unitOfWork, IAutoMapper autoMapper)
        {
            this._unitOfWork = unitOfWork;
            this._autoMapper = autoMapper;
        }

        public async Task Handle(UpdateBookCommandReuquest request, CancellationToken cancellationToken)
        {

            var books = await _unitOfWork.GetReadReponsitory<Book>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);
            var map = _autoMapper.Map<Book, UpdateBookCommandReuquest>(request);

           
            await _unitOfWork.GetWriteReponsitory<Book>().UpdateAsync(books);
            await _unitOfWork.SaveAsync();

        }
    }
}
