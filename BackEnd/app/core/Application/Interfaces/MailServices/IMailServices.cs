using Application.Features.Auths.Command.SendEmail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.MailServices
{
    public interface IMailServices
    {
        Task SendMailTo(SendEmailCommandAuthsRequest request);
    }
}
