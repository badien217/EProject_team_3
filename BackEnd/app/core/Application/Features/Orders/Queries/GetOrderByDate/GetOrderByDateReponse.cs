using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Orders.Queries.GetOrderByDate
{
    public class GetOrderByDateReponse
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public decimal Amount { get; set; }
        public string PaymentOption { get; set; }
        public bool TransactionStatus { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
