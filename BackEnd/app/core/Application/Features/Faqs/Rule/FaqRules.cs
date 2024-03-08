using Application.Bases;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Faqs.Rule
{
    public class FaqRules : BaseRule
    {
        public bool IsIdExists(IList<Faq> faq, int id)
        {
            return faq.Any(x => x.Id == id);
        }
    }
}
