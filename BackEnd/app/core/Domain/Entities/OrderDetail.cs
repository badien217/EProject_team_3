using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class OrderDetail : EntityBase,IEntityBase
    {
        public int OrderId { get; set; }
       
        public ICollection<Order> orders { get; set; }
        public int BookId { get;set; }
        public ICollection<Book> Books { get; set; }
        public int Quatity { get; set; }
        
        public OrderDetail() { }
        public OrderDetail(int orderId, int bookId, int quatity)
        {
            OrderId = orderId;
            BookId = bookId;
            Quatity = quatity;
        }
    }
}
