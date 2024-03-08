 using Application.Bases;
using Application.Features.Auths.Rules;
using Application.Interfaces.AutoMapper;
using Application.Interfaces.Token;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Queries.GetProfileQueries
{
    public class GetProfileQueriesHandler : BaseHandler, IRequestHandler<GetProfileQueriesRequest, GetProfileQueriesReponse>
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration configuration;
        private readonly ITokenServices tokenService;
        private readonly AuthRule authRules;

        public GetProfileQueriesHandler(UserManager<User> userManager, IConfiguration configuration,
            ITokenServices tokenService, AuthRule authRules, IAutoMapper mapper, IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.tokenService = tokenService;
            this.authRules = authRules;

        }
        public async Task<GetProfileQueriesReponse> Handle(GetProfileQueriesRequest request, CancellationToken cancellationToken)
        {
  
            var userProfile = await unitOfWork.GetReadReponsitory<UserProfile>().GetAsync(up => up.UserId == request.UserId);
            if (userProfile == null)
            {
                return new GetProfileQueriesReponse(); 
            }
            var response = new GetProfileQueriesReponse();
                response.Phone = userProfile.Phone;
                response.subscriptionType = userProfile.subscriptionType;
                response.paymentOption = userProfile.paymentOption;
               // response.paymentStatus = userProfile.paymentStatus;
                //response.avatar = userProfile.avatar;
            
            return response;
        }
    }
}
