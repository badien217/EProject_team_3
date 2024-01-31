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
    public class CreateBookCommandhandler : IRequestHandler<CreateBookCommandRequest>
    {
        public IUnitOfWork _unitOfWork;

        public CreateBookCommandhandler() { }
        public CreateBookCommandhandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async System.Threading.Tasks.Task Handle(CreateBookCommandRequest request, CancellationToken cancellationToken)
        {
            Book bookCustomer = new(request.Title, request.Author, request.PublishedDate, request.ImageUrl, request.Price);
            //await _unitOfWork.GetWriteReponsitory<Book>().AddRangerAsync();
            await _unitOfWork.SaveAsync();
        }
    }
}


