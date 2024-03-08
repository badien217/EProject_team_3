using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Command.Profile.UpdateProfile.UpdateProfileUser
{
    public class UpdateProfileUserRequest:IRequest<Unit>
    {
       
        public Guid UserId { get; set; }
        public string Phone { get; set; }
        public string subscriptionType { get; set; }
        public string paymentOption { get; set; }
        public string paymentStatus { get; set; }
        public string avatar { get; set; }
    }
}
