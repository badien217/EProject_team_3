using Application.Bases;
using Application.Features.Auths.Rules;
using Application.Features.Books.BookRule;
using Application.Features.Books.Exception;
using Application.Interfaces.AutoMapper;
using Application.Interfaces.Token;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Books.queries.GetByTitle
{
    public class GetByTitleBookQueriesHandler : BaseHandler,IRequestHandler<GetByTitleBookQueriesRequest, GetByTitleBookQueriesReponse>
    {
        private readonly IConfiguration configuration;
        private readonly ITokenServices tokenService;
        private readonly BookRules rules;

        public GetByTitleBookQueriesHandler(IConfiguration configuration,
            ITokenServices tokenService, BookRules rules, IAutoMapper mapper, IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
        {

            this.configuration = configuration;
            this.tokenService = tokenService;
            this.rules = rules;

        }
        public async Task<GetByTitleBookQueriesReponse> Handle(GetByTitleBookQueriesRequest request, CancellationToken cancellationToken)
        {
            var reponse = new GetByTitleBookQueriesReponse();
            IList<Book> boolAll = await unitOfWork.GetReadReponsitory<Book>().GetAllAsync();
            bool check = await rules.BookTitleNotFound(boolAll,request.Title);
            if (check)
            {
                var BookByTitle = await unitOfWork.GetReadReponsitory<Book>().GetAsync(up => up.Title == request.Title);
                if(BookByTitle is null)
                {
                    new GetByTitleBookQueriesReponse();
                }             
                reponse.Title = BookByTitle.Title;
                reponse.Author = BookByTitle.Author;
                reponse.ImageUrl = BookByTitle.ImageUrl;
                reponse.PublishedDate = BookByTitle.PublishedDate;
                reponse.Price = BookByTitle.Price;         
            }
            else
            {
                new BookTitleNotFound();
            }
            return reponse;
        }
       
    }
}
