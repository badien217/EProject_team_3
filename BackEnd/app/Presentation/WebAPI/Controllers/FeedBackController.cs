using Application.Features.Books.command.CreateBook;
using Application.Features.Books.command.DeleteBook;
using Application.Features.Books.command.UpdateBook;
using Application.Features.Books.queries.GetAll;
using Application.Features.Feedbacks.Command.CreateFeedbacks;
using Application.Features.Feedbacks.Command.DeleteFeedbacks;
using Application.Features.Feedbacks.Command.UpdateFeedbacks;
using Application.Features.Feedbacks.Queries.GetAll;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {
        public readonly IMediator mediator;
        public FeedBackController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpGet]

        public async Task<IActionResult> GetAllFeedback()
        {
            var reponse = await mediator.Send(new GetAllFeedbackRequest());
            return Ok(reponse);
        }

        [HttpPost]
        public async Task<IActionResult> Createfeedback(CreateFeedbackCommandRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }


        [HttpPost]
        public async Task<IActionResult> UpdateBook(UpdateFeedbackCommandRRequest requeste)
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
        /*     [HttpGet]
             public async Task<IActionResult> GetAllUserbyid()
             {
                 var reponse = await mediator.Send(new GetFeebbackByIDQueriesRequest());
                 return Ok(reponse);
             }*/
    }
}
