using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Product : EntityBase,IEntityBase
    {
        public string name { get; set; }
        public int FlavorId { get; set; }
        public Flavor Flavor { get; set; }
        public string imageUrl { get; set; }
        public Product() {  }
        public Product(string name, int flavorId, string imageUrl)
        {
            this.name = name;
            FlavorId = flavorId;
           
            this.imageUrl = imageUrl;
        }
    }
}
