using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Flavors.Command.CreateFlavors
{
    public class CreateFlavorsCommandRequest : IRequest
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        

    }
}
