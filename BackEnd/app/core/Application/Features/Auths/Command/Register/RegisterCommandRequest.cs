using MediatR;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Command.Register
{
    public class RegisterCommandRequest: IRequest<Unit>
    {
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string phone { get; set; }
        public string subscriptionType { get; set; }
        public string paymentOption { get; set; }
        public string paymentStatus { get; set; }
        public string avatar { get; set; }

    }
}
