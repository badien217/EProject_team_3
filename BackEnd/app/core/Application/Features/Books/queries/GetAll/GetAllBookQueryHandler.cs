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

namespace Application.Features.Books.queries.GetAll
{
    public class GetAllBookQueryHandler : IRequestHandler<GetAllBookQueryRequest, IList<GetAllBookQueryReponse>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _mapper;
        public GetAllBookQueryHandler(IUnitOfWork unitOfWork, IAutoMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IList<GetAllBookQueryReponse>> Handle(GetAllBookQueryRequest request, CancellationToken cancellationToken)
        {
            var books = await _unitOfWork.GetReadReponsitory<Book>().GetAllAsync();
            var rolers = _mapper.Map<RoleDto, Role>(new Role());

            var map = _mapper.Map<GetAllBookQueryReponse, Book>(books);
            return map;
        }
    }
}