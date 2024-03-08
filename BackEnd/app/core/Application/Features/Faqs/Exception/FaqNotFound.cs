using Application.Bases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Faqs.Exception
{
    public class FaqNotFound : BaseException
    {
        public FaqNotFound(): base("Faq không tồn tại") { }
    }
}
