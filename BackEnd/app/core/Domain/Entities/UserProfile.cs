using Domain.Common;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class UserProfile :EntityBase, IEntityBase
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Phone { get;set; }
        public string subscriptionType { get; set; }
        public string paymentOption { get; set; }
        public string paymentStatus { get; set; }
        public string avatar { get;set; }
        public User user { get; set; }
    }
}
