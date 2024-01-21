using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Book : EntityBase, IEntityBase
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime PublishedDate { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public Book() { }
        public Book(string title, string author, DateTime publishedDate, string imageUrl, decimal price)
        {
            Title = title;
            Author = author;
            PublishedDate = publishedDate;
            ImageUrl = imageUrl;
            Price = price;
        }
    }
}
