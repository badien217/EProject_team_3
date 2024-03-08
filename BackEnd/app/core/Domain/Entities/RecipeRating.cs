using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class RecipeRating : EntityBase, IEntityBase
    {
        public Guid ProfileId { get; set; }
        public UserProfile profile { get; set; }
        public int  recideId { get; set; }
        public Flavor flavor { get; set; }
        public float rating { get; set; }
        public string comment { get; set; }
        public RecipeRating() { }
        public RecipeRating(Guid profileId ,int recideId, float rating, string comment)
        {
            ProfileId = profileId;
            this.recideId = recideId;        
            this.rating = rating;
            this.comment = comment;
        }
    }
}
