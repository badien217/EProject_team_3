using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Faqs.Command.CreateFaq
{
    public class CreateFadRequest : IRequest<Unit>
    {
        public string question { get; set; }
        public string answer { get; set; }
    }
}
