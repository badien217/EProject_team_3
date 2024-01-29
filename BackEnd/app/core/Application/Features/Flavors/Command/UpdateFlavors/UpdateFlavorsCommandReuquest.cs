using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Flavors.Command.UpdateFlavors
{
    public class UpdateFlavorsCommandReuquest : IRequest
    {
        public  int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
     
       


    }
}
