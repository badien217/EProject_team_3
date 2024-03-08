using Application.Features.Books.BookRule;
using Application.Features.Books.Exception;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Books.command.CreateBook
{
    public class CreateBookCommandhandler : IRequestHandler<CreateBookCommandRequest,Unit>
    {
        public IUnitOfWork _unitOfWork;
        public BookRules BookRules;

        public CreateBookCommandhandler() { }
        public CreateBookCommandhandler(IUnitOfWork unitOfWork,BookRules book)
        {
            _unitOfWork = unitOfWork;
            BookRules = book;
        }
        public async System.Threading.Tasks.Task<Unit> Handle(CreateBookCommandRequest request, CancellationToken cancellationToken)
        {
            IList<Book> books = await _unitOfWork.GetReadReponsitory<Book>().GetAllAsync();
            await BookRules.BookTitleMostNotBeSame(books, request.Title);
            
            Book bookCustomer = new(request.Title, request.Author, request.PublishedDate, request.ImageUrl, request.Price);
            await _unitOfWork.GetWriteReponsitory<Book>().AddAsync(bookCustomer);
            await _unitOfWork.SaveAsync();
            return Unit.Value;
            
        }
    }
}


