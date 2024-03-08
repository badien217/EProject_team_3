using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class IceCream : EntityBase,IEntityBase
    {   
        public IceCream() { }
        public string Name { get; set; }   
        public int Flavorld { get; set; }
        public string ImageUrl { get;set; }
        public ICollection<Flavor> Flavor { get; set; }
       
        public IceCream(string name, int flavorld, string imageUrl)
        {
            Name = name;
            Flavorld = flavorld;
            ImageUrl = imageUrl;
        }
    }
}
