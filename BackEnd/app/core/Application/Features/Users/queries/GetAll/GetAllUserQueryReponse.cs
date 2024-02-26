using Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Users.queries.GetAll
{
    public class GetAllUserQueryReponse
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string phone { get; set; }
        public string SubcriptionType { get; set; }
        public bool PaymentStatus { get; set; }
        public RoleDto role { get;set; }  


    }
}
