using Application.Features.Books.command.CreateBook;
using Application.Features.Books.command.DeleteBook;
using Application.Features.Books.command.UpdateBook;
using Application.Features.Books.queries.GetAll;
using Application.Features.Feedbacks.Command.CreateFeedbacks;
using Application.Features.Feedbacks.Command.DeleteFeedbacks;
using Application.Features.Feedbacks.Command.UpdateFeedbacks;
using Application.Features.Feedbacks.Queries.GetById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        public readonly IMediator mediator;
        public BookController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpGet]
        
        public async Task<IActionResult> GetAllBook()
        {
            var reponse = await mediator.Send(new GetAllBookQueryRequest());
            return Ok(reponse);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBook(CreateBookCommandRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }


        [HttpPost]
        public async Task<IActionResult> UpdateBook(UpdateBookCommandReuquest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> DeleteUser(DeleteBookCommandRequest requeste)
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
