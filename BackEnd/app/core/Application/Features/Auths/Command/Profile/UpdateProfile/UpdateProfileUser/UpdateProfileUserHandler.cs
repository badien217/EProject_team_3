using Application.Bases;
using Application.Features.Auths.Rules;
using Application.Features.Books.BookRule;
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

namespace Application.Features.Auths.Command.Profile.UpdateProfile.UpdateProfileUser
{
    public class UpdateProfileUserHandler : BaseHandler,IRequestHandler<UpdateProfileUserRequest,Unit>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _autoMapper;
        private readonly AuthRule Rule;
        public UpdateProfileUserHandler(AuthRule Rule, IAutoMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
        {
            this._unitOfWork = unitOfWork;
            this._autoMapper = mapper;
            this.Rule = Rule;
        }
        public async Task<Unit> Handle(UpdateProfileUserRequest request, CancellationToken cancellationToken)
        {
            UserProfile profile = await unitOfWork.GetReadReponsitory<UserProfile>().GetAsync(x => x.UserId == request.UserId && !x.IsDeleted);
            var map = _autoMapper.Map<UserProfile, UpdateProfileUserRequest>(request);
            await _unitOfWork.GetWriteReponsitory<UserProfile>().UpdateAsync(map);
            await _unitOfWork.SaveAsync();
            return Unit.Value;
        }
    }
}  
