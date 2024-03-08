using Application.Features.Books.command.CreateBook;
using Application.Features.Books.command.DeleteBook;
using Application.Features.Books.command.UpdateBook;
using Application.Features.Books.queries.GetAll;
using Application.Features.Books.queries.GetById;
using Application.Features.Books.queries.GetTotal;
using Application.Features.Feedbacks.Command.CreateFeedbacks;
using Application.Features.Feedbacks.Command.DeleteFeedbacks;
using Application.Features.Feedbacks.Command.UpdateFeedbacks;
using Application.Features.Feedbacks.Queries.GetById;
using Azure.Core;
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
        private readonly IAuthorizationService authorizationService;
        public BookController(IMediator mediator, IAuthorizationService authorizationService)
        {
            this.mediator = mediator;
            this.authorizationService = authorizationService;
        }
        [HttpGet]

        public async Task<IActionResult> GetAllBook()
        {
            var response = await mediator.Send(new GetAllBookQueryRequest());
            return Ok(response);

        }

        [HttpPost]
       // [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateBook(CreateBookCommandRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]
       // [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateBook(UpdateBookCommandReuquest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]
       // [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteBook(DeleteBookCommandRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]

        public async Task<IActionResult> GetBookById(GetByIdCommandRequest request)
        {
            await mediator.Send(request);
            return Ok();
        }
        [HttpGet]

        public async Task<IActionResult> GetTotalBook()
        {
            var response = await mediator.Send(new GetTotalBookRequest());
            return Ok(response);
        }

    } 
}
