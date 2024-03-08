using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class BookRating : EntityBase,IEntityBase
    {
        public string name { get; set; }
        public int bookId { get; set; }
        public Book book { get; set; }
        public float rating { get; set; }
        public string comment { get; set; }
        public BookRating() { } 
        public BookRating(string name, int bookId, float rating, string comment)
        {
            this.name = name;
            this.bookId = bookId;
            this.rating = rating;
            this.comment = comment;
        }
    }
}
