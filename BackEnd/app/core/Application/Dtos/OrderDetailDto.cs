using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos
{
    public class OrderDetailDto
    {
        public int OrderId { get; set; }

        public Order orders { get; set; }
        public int BookId { get; set; }
        public ICollection<Book> Books { get; set; }
        public int Quatity { get; set; }
    }
}
