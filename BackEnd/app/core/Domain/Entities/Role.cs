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
        public ICollection<Admin> Admin { get; set; }
        public ICollection<User> Users { get; set; }
        public Role() { }
        public Role(string name)
        {
            this.name = name;
        }
    }
}
