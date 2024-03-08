using Application.Bases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Exceptions
{
    public class UserAlreadyExistException : BaseException
    {
        public UserAlreadyExistException():base("Tài khoản này đã tồn tại!") { }
    }
}
