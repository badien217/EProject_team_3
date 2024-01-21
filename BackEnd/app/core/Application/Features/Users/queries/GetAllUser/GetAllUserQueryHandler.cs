using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Application.Interfaces.UnitOfWorks;
using Domain.Entities;
using Application.Interfaces.AutoMapper;
using Application.DTOs;
using Microsoft.EntityFrameworkCore;


namespace Application.Features.Users.queries.GetAllUser
{
    public class GetAllUserQueryHandler : IRequestHandler<GetAllUserQueryRequest, IList<GetAllUserQueryReponse>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAutoMapper _mapper;
        public GetAllUserQueryHandler(IUnitOfWork unitOfWork, IAutoMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IList<GetAllUserQueryReponse>> Handle(GetAllUserQueryRequest request, CancellationToken cancellationToken)
        {
            var user = await _unitOfWork.GetReadReponsitory<User>().GetAllAsync();
            var role = _mapper.Map<RoleDto, Role>(new Role());
            List<GetAllUserQueryReponse> reponse = new();

            var map = _mapper.Map<GetAllUserQueryReponse, User>(user);
            return map;
        }
    }
}
