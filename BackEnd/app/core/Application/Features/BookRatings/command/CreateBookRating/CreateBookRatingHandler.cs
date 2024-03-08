using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.BookRatings.command.CreateBookRating
{
    public class CreateBookRatingHandler : IRequestHandler<CreateBookRatingRequest,Unit>
    {
        public readonly IUnitOfWork unitOfWork;
        public CreateBookRatingHandler(IUnitOfWork unitOfWork) {
        this.unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(CreateBookRatingRequest request, CancellationToken cancellationToken)
        {
            BookRating bookRating = new(request.name, request.bookId, request.rating, request.comment);
            await unitOfWork.GetWriteReponsitory<BookRating>().AddAsync(bookRating);
            await unitOfWork.SaveAsync();
            return Unit.Value;
        }
    }
}
