using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Role :EntityBase,IEntityBase
    {
        public string name { get; set; }  
        public User User { get; set; }
        public Admin admin { get; set; }    
        
        public Role() { }
        public Role(string name)
        {
            this.name = name;
        }
    }
}
