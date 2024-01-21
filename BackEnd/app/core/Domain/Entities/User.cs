using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User : EntityBase, IEntityBase
    {
        public string Username { get;set; }
        public string Password { get;set; }
        public string Email { get;set; }
        public string phone { get;set; }
        public string SubcriptionType { get;set; }
        public bool PaymentStatus { get;set; }
        public int RoleId { get;set; }
        public Role role { get;set; }
        public User() { }
        public User(string username,string password,string email,string Phone, string subcriptionType,bool paymentStatus,int roleId) { 
            Username = username;
            Password = password;
            Email = email;
            phone = Phone;
            SubcriptionType = subcriptionType;
            PaymentStatus = paymentStatus;  
            RoleId = roleId;
                
        }
    }
}
