using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Flavors.Command.CreateFlavors
{
    public class CreateFlavorsCommandRequest
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public IceCream iceCream { get; set; }

    }
}
