using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Faqs.Command.UpdateFaq
{
    public class UpdateFaqRequest : IRequest<Unit>
    {
        public int id { get; set; }
        public string question { get; set; }
        public string answer { get; set; }
    } 
}
