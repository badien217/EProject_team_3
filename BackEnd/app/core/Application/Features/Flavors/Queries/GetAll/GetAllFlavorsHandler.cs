using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using persistence.Interfaces.UnitOfWorks;
using Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Flavors.Queries.GetAll
{
    public class GetAllFlavorsHandler : IRequestHandler<GetAllFlavorsRequest, IList<GetAllFlavorsReponse>>
    {
        public readonly IUnitOfWork UnitOfWork;
        public readonly IAutoMapper AutoMapper;

        public GetAllFlavorsHandler(IAutoMapper autoMapper, IUnitOfWork unitOfWork)
        {
            this.AutoMapper = autoMapper;
            this.UnitOfWork = unitOfWork;

        }
        public async Task<IList<GetAllFlavorsReponse>> Handle(GetAllFlavorsRequest request, CancellationToken cancellationToken)
        {
            var Flavors = await UnitOfWork.GetReadReponsitory<Flavor>().GetAllAsync(include: x => x.Include(b => b.iceCream));
            // goi flavors lau unitofwork de lay getreadreponsitory cho flavor  , goi getallasync de chua icecream
            var icecreamDto = AutoMapper.Map<IceDto, IceCream>(new IceCream());
            // goi icecreamDto lay automapper trong do chua Dto cua no va doi tuong .

            var map = AutoMapper.Map<GetAllFlavorsReponse, Flavor>(Flavors);
            return map;

        }
    }
}
