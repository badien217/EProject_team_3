
using Application.Bases;
using Application.Features.Books.BookRule;
using Application.Features.Books.Exception;
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Books.command.UpdateBook
{
    public class UpdateBookCommandHandler : BaseHandler,IRequestHandler<UpdateBookCommandReuquest,Unit>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _autoMapper;
        private readonly BookRules bookRule;
        public UpdateBookCommandHandler( BookRules bookRules,IAutoMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
        {
            this._unitOfWork = unitOfWork;
            this._autoMapper = mapper;
            this.bookRule = bookRules;
        }

        public async Task<Unit> Handle(UpdateBookCommandReuquest request, CancellationToken cancellationToken)
        {
            IList<Book> books = await _unitOfWork.GetReadReponsitory<Book>().GetAllAsync();
            bool isIdExists = bookRule.IsIdExists(books, request.Id);

            if (isIdExists)
            {
                var bookToUpdate = await _unitOfWork.GetReadReponsitory<Book>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);

                if (bookToUpdate != null)
                {
                    var map = _autoMapper.Map<Book, UpdateBookCommandReuquest>(request);
                    await _unitOfWork.GetWriteReponsitory<Book>().UpdateAsync(map);
                    await _unitOfWork.SaveAsync();
                }
                else
                {
                    throw new BookTitleNotFound(); 
                }
            }
            else
            {
                throw new BookTitleNotFound(); 
            }

            return Unit.Value;
        }
    }
}
