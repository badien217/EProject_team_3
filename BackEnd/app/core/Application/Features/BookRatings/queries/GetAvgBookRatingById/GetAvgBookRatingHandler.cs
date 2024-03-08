using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.BookRatings.queries.GetAvgBookRatingById
{
    public class GetAvgBookRatingHandler : IRequestHandler<GetAvgBookRatingRequest, GetAvgBookRatingReponse>
    {
        public readonly IUnitOfWork unitOfWork;
        public readonly IAutoMapper autoMapper;
        public float total;
        public GetAvgBookRatingHandler(IUnitOfWork unitOfWork, IAutoMapper autoMapper)
        {
            this.unitOfWork = unitOfWork;
            this.autoMapper = autoMapper;
        }
        public async Task<GetAvgBookRatingReponse> Handle(GetAvgBookRatingRequest request, CancellationToken cancellationToken)
        {
            
            IList<BookRating> bookRatings = await unitOfWork.GetReadReponsitory<BookRating>().GetAllAsync(x => x.bookId == request.BookId);
            int countBookRating = await unitOfWork.GetReadReponsitory<BookRating>().CountAsync(x => x.bookId == request.BookId);
            foreach(var item in bookRatings)
            {
                total += item.rating;
                
            }
            float avger = (float)Math.Round(total / countBookRating);
            var reponse = new GetAvgBookRatingReponse();
            reponse.avg = avger;
            return reponse;
        }
    }
}
