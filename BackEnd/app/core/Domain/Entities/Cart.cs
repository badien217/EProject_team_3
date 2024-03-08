using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Cart : EntityBase,IEntityBase
    {
        public Guid ProfileId { get; set; }
        public UserProfile profile { get; set; }

        public Cart() { }

    }
}
