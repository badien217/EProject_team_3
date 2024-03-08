using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class userRecipe : EntityBase,IEntityBase
    {
        public Guid ProfileId { get; set; }
        public UserProfile profile { get; set; }
        public int RecipeId { get; set; }
        public Recipe recipe { get; set; }
    }
}
