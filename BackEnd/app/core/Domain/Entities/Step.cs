using Domain.Common;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Step : EntityBase,IEntityBase
    {
        public string Content { get;set; }
        public string ImageUrl { get;set; }
        public int RecipeId { get; set; }
        public Recipe recipe { get; set; }
        public Step() { }
        public Step(string content, string imageUrl, int recipeId)
        {
            Content = content;
            ImageUrl = imageUrl;
            RecipeId = recipeId;
        }
    }
}
