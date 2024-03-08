using Application.Bases;
using Application.Features.Auths.Rules;
using Application.Interfaces.AutoMapper;
using Application.Interfaces.Token;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Command.Profile.UpdateProfile.ChangePassword
{
    public class ChangePasswordHander :BaseHandler, IRequestHandler<ChangePasswordRequest,Unit>
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration configuration;
        private readonly ITokenServices tokenService;
        private readonly AuthRule authRules;
        private readonly IUnitOfWork unitOfWork;

        public ChangePasswordHander(UserManager<User> userManager, IConfiguration configuration,
            ITokenServices tokenService, AuthRule authRules, IAutoMapper mapper, IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.tokenService = tokenService;
            this.authRules = authRules;
            this.unitOfWork = unitOfWork;

        }

        public async Task<Unit> Handle(ChangePasswordRequest request, CancellationToken cancellationToken)
        {
            User user = await userManager.FindByEmailAsync(request.email);
            bool checkPassword = await userManager.CheckPasswordAsync(user, request.oldPassword);

            await authRules.EmailOrPasswordShouldNotBeInvalid(user, checkPassword);
            if (request.newPassword == request.ConfirmPassword)
            {
                var passwordhardler = new PasswordHasher<User>();
                var newPassword = passwordhardler.HashPassword(user, request.newPassword);
                user.PasswordHash = newPassword;
            }
            await userManager.UpdateAsync(user);
            await unitOfWork.SaveAsync();
            return Unit.Value;
        }
    }
}
