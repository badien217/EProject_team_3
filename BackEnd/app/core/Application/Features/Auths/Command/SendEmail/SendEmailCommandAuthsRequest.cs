using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Command.SendEmail
{
    public class SendEmailCommandAuthsRequest : IRequest
    {
        public string Email { get; set; }
        public string subject { get; set; }
        public string body { get; set; }
    }
}
