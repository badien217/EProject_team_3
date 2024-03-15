using Application.Features.Feedbacks.Command.CreateFeedbacks;
using Application.Features.Feedbacks.Command.DeleteFeedbacks;
using Application.Features.Feedbacks.Command.UpdateFeedbacks;
using Application.Features.Feedbacks.Queries.GetAll;
using Application.Features.Steps.Command.DeleteSteps;
using Application.Features.Steps.Command.UpdateSteps;
using Application.Features.Steps.Queries.GetAll;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StepController : ControllerBase
    {
        public readonly IMediator mediator;
        public StepController(IMediator mediator) { 
        this.mediator = mediator;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllStep()
        {
            var reponse = await mediator.Send(new GetAllStepsRequest());
            return Ok(reponse);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSteps(CreateFeedbackCommandRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }


        [HttpPost]
        public async Task<IActionResult> UpdateBook(UpdateStepsCommandRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteUser(DeleteStepsCommandRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        /*     [HttpGet]
             public async Task<IActionResult> GetAllUserbyid()
             {
                 var reponse = await mediator.Send(new GetFeebbackByIDQueriesRequest());
                 return Ok(reponse);
             }*/

    }
}
