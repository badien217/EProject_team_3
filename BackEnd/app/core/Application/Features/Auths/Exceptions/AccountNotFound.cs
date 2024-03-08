using Application.Bases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Exceptions
{
    public class AccountNotFound : BaseException
    {
        public AccountNotFound():base("tài khoàn không tồn tại") { }
    }
}
