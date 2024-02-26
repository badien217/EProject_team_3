using Application.Bases;
using Application.Features.Auths.Rules;
using Application.Interfaces.AutoMapper;
using Application.Interfaces.Token;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using persistence.Interfaces.UnitOfWorks;

namespace Application.Features.Books.queries.GetById
{
    public class GetByIdCommandHandler : BaseHandler, IRequestHandler<GetByIdCommandRequest, GetByIdCommandReponse>
    {

        private readonly IConfiguration configuration;
        private readonly ITokenServices tokenService;
        private readonly AuthRule authRules;

        public GetByIdCommandHandler(IConfiguration configuration,
            ITokenServices tokenService, AuthRule authRules, IAutoMapper mapper, IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
        {

            this.configuration = configuration;
            this.tokenService = tokenService;
            this.authRules = authRules;

        }
        public async Task<GetByIdCommandReponse> Handle(GetByIdCommandRequest request, CancellationToken cancellationToken)
        {
            var bookById = await unitOfWork.GetReadReponsitory<Book>().GetAsync(up => up.Id == request.id && !up.IsDeleted);
            if(bookById is null)
            {
                return new GetByIdCommandReponse();
            }
            var reponse = new GetByIdCommandReponse();
            reponse.Title = bookById.Title;
            reponse.Author = bookById.Author;
            reponse.ImageUrl = bookById.ImageUrl;
            reponse.PublishedDate = bookById.PublishedDate;
            reponse.Price = bookById.Price;
            return reponse;
        }
    }
}
