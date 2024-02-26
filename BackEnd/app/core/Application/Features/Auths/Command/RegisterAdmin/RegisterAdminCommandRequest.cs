using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Command.RegisterAdmin
{
    public class RegisterAdminCommandRequest : IRequest<Unit>
    {
        public string fullname { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
