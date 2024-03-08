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

namespace Application.Features.Auths.Command.Profile.DeleteProfile
{
    public class DeleteProfileCommandHandler : BaseHandler,IRequestHandler<DeleteProfileCommandRequest,Unit>
    {
        public readonly IUnitOfWork unitOfWork;

        public DeleteProfileCommandHandler(IUnitOfWork unitOfWork, IAutoMapper mapper, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
        {
            this.unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(DeleteProfileCommandRequest request, CancellationToken cancellationToken)
        {
            var userProfile = await unitOfWork.GetReadReponsitory<UserProfile>().GetAsync(x => x.UserId == request.Id && !x.IsDeleted);
            if (userProfile == null) {
                throw new Exception("tài khoan k ton tai");
            }
            else
            {
                userProfile.IsDeleted = true;
            }
            await unitOfWork.GetWriteReponsitory<UserProfile>().UpdateAsync(userProfile);
            await unitOfWork.SaveAsync();
            return Unit.Value;
        }
    }
}
