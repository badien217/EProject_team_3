using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Steps.Command.CreateManyStep
{
    public class CreateManyStepsRequest : IRequest<Unit>
    {
        public IList<Step> steps { get;set; }
    }
}
