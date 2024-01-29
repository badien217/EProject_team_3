using Application.Dtos;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Flavors.Queries.GetAll
{
    public class GetAllFlavorsReponse
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public IceDto IceDto { get; set; }

    }
}
