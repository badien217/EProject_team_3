using MailKit.Net.Smtp;
using MailKit.Security;
using MediatR;
using Microsoft.Extensions.Options;
using MimeKit;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Command.SendEmail
{
    public class SendEmailCommandAuthsHandler : IRequestHandler<SendEmailCommandAuthsRequest>
    {
        public readonly SendMailCommandAuthsSettings _mailSetting;
        public SendEmailCommandAuthsHandler(IOptions<SendMailCommandAuthsSettings> options) {
        this._mailSetting = options.Value;
        }
        public async Task Handle(SendEmailCommandAuthsRequest request, CancellationToken cancellationToken)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSetting.Email);
            email.To.Add(MailboxAddress.Parse(request.Email));
            email.Subject = request.subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = request.body;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSetting.Host, _mailSetting.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSetting.Email, _mailSetting.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);


        }
    }
}
