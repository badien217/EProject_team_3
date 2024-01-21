using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Recipe : EntityBase ,IEntityBase 
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public string SubMittedBy { get; set; }
        public string Ingredients { get; set; }
        public Recipe() { }
        public Recipe(string name, string description, string imageURL, string subMittedBy, string ingredients)
        {
            Name = name;
            Description = description;
            ImageURL = imageURL;
            SubMittedBy = subMittedBy;
            Ingredients = ingredients;
        }
    }
}
