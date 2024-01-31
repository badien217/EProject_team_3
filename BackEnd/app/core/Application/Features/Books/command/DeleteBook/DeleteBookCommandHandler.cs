
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Books.command.DeleteBook
{
    public class DeleteBookCommandHandler : IRequestHandler<DeleteBookCommandRequest, Unit>
    {
        public readonly IUnitOfWork unitOfWork;
        public DeleteBookCommandHandler (IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(DeleteBookCommandRequest request, CancellationToken cancellationToken)
        {
            var books = await unitOfWork.GetReadReponsitory<Book>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);
            books.IsDeleted = true;

            await unitOfWork.GetWriteReponsitory<Book>().UpdateAsync(books);
            await unitOfWork.SaveAsync();

            return Unit.Value;
        }
    }
}
