
using Application.Features.Feedbacks.Queries.GetAll;
using Application.Features.Feedbacks.Command.CreateFeedbacks;
using Application.Features.Feedbacks.Command.UpdateFeedbacks;
using Application.Features.Feedbacks.Command.DeleteFeedbacks;
using Application.Features.Feedbacks.Queries.GetById;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Features.Auths.Command.Register;
using Application.Features.Books.queries.GetAll;
using Microsoft.AspNetCore.Authorization;

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
        [Authorize]
        public async Task<IActionResult> GetAllUser()
        {
            var reponse = await mediator.Send(new GetAllBookQueryRequest());
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
