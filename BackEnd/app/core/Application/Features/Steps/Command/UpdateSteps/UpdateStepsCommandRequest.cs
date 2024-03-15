using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Steps.Command.UpdateSteps
{
    public class UpdateStepsCommandRequest : IRequest
    {
        public int id { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
        public int RecipeId { get; set; }

    }
}
