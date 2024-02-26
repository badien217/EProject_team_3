using Application.Dtos;
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using persistence.Interfaces.UnitOfWorks;

namespace Application.Features.Users.queries.GetAll
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
            var users = await _unitOfWork.GetReadReponsitory<User>().GetAllAsync();
            //
            var rolers = _mapper.Map<RoleDto, Role>(new Role());

            var map = _mapper.Map<GetAllUserQueryReponse, User>(users);
            return map;
        }
    }
}
