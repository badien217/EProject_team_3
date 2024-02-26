
using Application.Bases;
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
    public class UpdateBookCommandHandler : BaseHandler,IRequestHandler<UpdateBookCommandReuquest>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _autoMapper;
        public UpdateBookCommandHandler( IAutoMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
        {
            this._unitOfWork = unitOfWork;
            this._autoMapper = mapper;
        }

        public async Task Handle(UpdateBookCommandReuquest request, CancellationToken cancellationToken)
        {

            var books = await _unitOfWork.GetReadReponsitory<Book>().GetAsync(x => x.Id == request.Id && !x.IsDeleted);
            var map = _autoMapper.Map<Book, UpdateBookCommandReuquest>(request);
          //  var BookRole = await _unitOfWork.GetReadReponsitory<Role>().GetAsync(x => x.Id == books.Id);
           
            await _unitOfWork.GetWriteReponsitory<Book>().UpdateAsync(books);
            await _unitOfWork.SaveAsync();

        }
    }
}
