
using Application.Features.Feedbacks.Queries.GetAll;
using Application.Features.Feedbacks.Command.CreateFeedbacks;
using Application.Features.Feedbacks.Command.UpdateFeedbacks;
using Application.Features.Feedbacks.Command.DeleteFeedbacks;
using Application.Features.Feedbacks.Queries.GetById;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IMediator mediator;
        public ValuesController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            var reponse = await mediator.Send(new GetAllFeedbackRequest());
            return Ok(reponse);
        }
        [HttpPost] 
        public async Task<IActionResult> CreateUser (CreateFeedbackCommandRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> UpdateUser(UpdateFeedbackCommandRRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> DeleteUser(DeleteFeedbackCommandRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> GetAllUserbyid()
        {
            var reponse = await mediator.Send(new GetFeebbackByIDQueriesRequest());
            return Ok(reponse);
        }
    }
}
