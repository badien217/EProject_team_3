using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Flavor : EntityBase,IEntityBase
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public IceCream iceCream { get; set; }
        public Flavor() { }
        public Flavor(string name, string imageUrl) { }
    }
}
