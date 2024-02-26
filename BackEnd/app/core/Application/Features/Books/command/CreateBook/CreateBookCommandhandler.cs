
using Application.Bases;
using Application.Features.Books.BookRule;
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

namespace Application.Features.Books.command.CreateBook
{
    public class CreateBookCommandhandler : BaseHandler, IRequestHandler<CreateBookCommandRequest>
    {
        public IUnitOfWork _unitOfWork;
        public BookRules _bookRules;

     
        public CreateBookCommandhandler(IUnitOfWork unitOfWork, IAutoMapper mapper, IHttpContextAccessor httpContextAccessor,BookRules bookRules) : base(mapper, unitOfWork, httpContextAccessor)
        {
            _unitOfWork = unitOfWork;
            _bookRules = bookRules;

        }
        public async System.Threading.Tasks.Task Handle(CreateBookCommandRequest request, CancellationToken cancellationToken)
        {
            Book bookCustomer = new(request.Title, request.Author, request.PublishedDate, request.ImageUrl, request.Price);
            await _unitOfWork.GetWriteReponsitory<Book>().AddAsync(bookCustomer);
            await _unitOfWork.SaveAsync();
        }
    }
}


