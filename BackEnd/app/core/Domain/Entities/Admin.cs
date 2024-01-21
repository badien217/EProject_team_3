using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Admin : EntityBase, IEntityBase
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }
        public Role role { get; set; }
        public Admin() { }
        public Admin(string username, string password,int roleId) {
            Username = username;
            Password = password;
            RoleId = roleId;
        }
    }
}
