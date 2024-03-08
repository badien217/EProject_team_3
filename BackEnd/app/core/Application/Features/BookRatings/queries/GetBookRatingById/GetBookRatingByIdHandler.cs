using Application.Dtos;
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.BookRatings.queries.GetBookRatingById
{
    public class GetBookRatingByIdHandler : IRequestHandler<GetBookRatingByIdRequest, GetBookRatingByIdReponse>
    {
        public readonly IUnitOfWork unitOfWork;
        public readonly IAutoMapper autoMapper;
        public GetBookRatingByIdHandler(IUnitOfWork unitOfWork,IAutoMapper autoMapper)
        {
            this.unitOfWork = unitOfWork;
            this.autoMapper = autoMapper;
        }

        public async Task<GetBookRatingByIdReponse> Handle(GetBookRatingByIdRequest request, CancellationToken cancellationToken)
        {
            var bookrating = await unitOfWork.GetReadReponsitory<BookRating>().GetAsync(x => x.Id == request.Id,
            y => y.Include(y => y.book));
            var mapBook = autoMapper.Map<BookDTO, Book>(new Book());
            var map = autoMapper.Map<GetBookRatingByIdReponse, BookRating>(bookrating);
            return map;
        }
    }
}
