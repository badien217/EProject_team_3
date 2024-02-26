using Application.Bases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Books.Exception
{
    public class BookTitleMustNotBeSameException : BaseException
    {
        
        public BookTitleMustNotBeSameException() : base("book đã tồn tại!!") { }
    }
}
