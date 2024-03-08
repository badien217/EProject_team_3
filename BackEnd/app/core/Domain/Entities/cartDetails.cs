using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class cartDetails : EntityBase,IEntityBase
    {
        public int cartId { get; set; }
        public Cart cart { get; set; }
        public int bookId { get; set; }
        public Book book { get; set; }
        public float Quantity { get; set; }
        public cartDetails() { }
        public cartDetails(int cartId, Cart cart, int bookId, float quantity)
        {
            this.cartId = cartId;
            this.cart = cart;
            this.bookId = bookId;
            Quantity = quantity;
        }
    }
}
