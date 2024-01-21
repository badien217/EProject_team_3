using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using persistence.UnitOfWorks;
using Domain.Entities;

namespace Application.Features.Users.queries
{
    public class GetAllUserQueryHandler : IRequestHandler<GetAllUserQueryRequest, IList<GetAllUserQueryReponse>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetAllUserQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IList<GetAllUserQueryReponse>> Handle(GetAllUserQueryRequest request, CancellationToken cancellationToken)
        {
            var user = await _unitOfWork.GetReadReponsitory<User>().GetAllAsync();
            List<GetAllUserQueryReponse> reponse = new();
            foreach (var item in user)
            {
                reponse.Add(new GetAllUserQueryReponse
                {
                    Username = item.Username,
                    Email = item.Email,
                    phone = item.phone,
                    SubcriptionType = item.SubcriptionType,
                    PaymentStatus = item.PaymentStatus,

                });
                  
            }
             return  reponse;
        }
    }
}
