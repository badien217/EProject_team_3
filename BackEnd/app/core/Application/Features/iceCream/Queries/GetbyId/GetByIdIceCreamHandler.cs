using Application.Bases;
using Application.Dtos;
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

namespace Application.Features.iceCream.Queries.GetbyId
{
    public class GetByIdIceCreamHandler : IRequestHandler<GetByIdIceCreamRequest, GetByIdIceCreamReponse>
    {

        public readonly IUnitOfWork _unitOfWork;
        public readonly IAutoMapper _autoMapper;
        public GetByIdIceCreamHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {

            this._autoMapper = autoMapper;
            this._unitOfWork = unitOfWork;
        }


        public async Task<GetByIdIceCreamReponse> Handle(GetByIdIceCreamRequest request, CancellationToken cancellationToken)
        {
            var IceCreams = await _unitOfWork.GetReadReponsitory<IceCream>().GetAsync(y => y.Id == request.Id,include: x => x.Include(y => y.Flavor));
            var flavor = _autoMapper.Map<FlavorDto, Flavor>(new Flavor());
            var map = _autoMapper.Map<GetByIdIceCreamReponse, IceCream>(IceCreams);
            
            return map;
        }
    }
}
