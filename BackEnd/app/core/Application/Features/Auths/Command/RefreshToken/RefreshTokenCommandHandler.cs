using Application.Bases;
using Application.Features.Auths.Rules;
using Application.Interfaces.AutoMapper;
using Application.Interfaces.Token;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Command.RefreshToken
{
    public class RefreshTokenCommandHandler :BaseHandler, IRequestHandler<RefreshTokenCommandRequest, RefreshTokenCommandReponse>
    {
        private readonly AuthRule authRules;
        private readonly UserManager<User> userManager;
        private readonly ITokenServices tokenService;
        public RefreshTokenCommandHandler(IAutoMapper mapper, AuthRule authRules, UserManager<User> userManager, ITokenServices tokenService, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
        {
            this.authRules = authRules;
            this.userManager = userManager;
            this.tokenService = tokenService;

        }

        public async Task<RefreshTokenCommandReponse> Handle(RefreshTokenCommandRequest request, CancellationToken cancellationToken)
        {
            ClaimsPrincipal? principal = tokenService.GetPrincipalFromExpiredToken(request.AccessToken);
            string email = principal.FindFirstValue(ClaimTypes.Email);

            User? user = await userManager.FindByEmailAsync(email);
            IList<string> roles = await userManager.GetRolesAsync(user);

            await authRules.RefreshTokenShouldNotBeExpired(user.RefreshTokenExpiryTime);

            JwtSecurityToken newAccessToken = await tokenService.CreateToken(user, roles);
            string newRefreshToken = tokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            await userManager.UpdateAsync(user);

            return new()
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
                RefreshToken = newRefreshToken,
            };
        }
    }
}
