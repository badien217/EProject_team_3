using Application.Bases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Books.Exception
{
    public class BookTitleNotFound : BaseException
    {
        public BookTitleNotFound() : base("book is not found") { }
    }
}
