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

namespace Application.Features.BookRatings.queries.GetAll
{
    public class GetAllBookRatingHandler : IRequestHandler<GetAllBookRatingRequest, IList<GetAllBookRatingReponse>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _mapper;
        public GetAllBookRatingHandler(IUnitOfWork unitOfWork, IAutoMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<IList<GetAllBookRatingReponse>> Handle(GetAllBookRatingRequest request, CancellationToken cancellationToken)
        {
            var bookrating = await _unitOfWork.GetReadReponsitory<BookRating>().GetAllAsync(include: x => x.Include(b => b.book));
            var bookName = _mapper.Map<BookDTO, Book>(new Book());
            var map = _mapper.Map<GetAllBookRatingReponse, BookRating>(bookrating);
            return map;

        }
    }
}
