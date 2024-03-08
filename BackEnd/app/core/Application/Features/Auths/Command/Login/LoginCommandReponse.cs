using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Command.Login
{
    public class LoginCommandReponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public DateTime Expiration { get; set; }
        public string IdClient { get; set; }
        public IList<string> Role { get;set; }
       

       
    }
}
