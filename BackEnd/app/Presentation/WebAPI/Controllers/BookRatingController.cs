using Application.Features.BookRatings.command.CreateBookRating;
using Application.Features.BookRatings.queries.GetAll;
using Application.Features.BookRatings.queries.GetAvgBookRatingById;
using Application.Features.BookRatings.queries.GetBookRatingById;
using Application.Features.Books.command.CreateBook;
using Application.Features.Books.queries.GetAll;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BookRatingController : ControllerBase
    {
        public readonly IMediator mediator;
        private readonly IAuthorizationService authorizationService;
        public BookRatingController(IMediator mediator, IAuthorizationService authorizationService)
        {
            this.mediator = mediator;
            this.authorizationService = authorizationService;
        }
        [HttpGet]

        public async Task<IActionResult> GetAllBookRating()
        {
            var response = await mediator.Send(new GetAllBookRatingRequest());
            return Ok(response);

        }

        [HttpPost]
        public async Task<IActionResult> CreateBookRating(CreateBookRatingRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> GetBookRatingById(GetBookRatingByIdRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> GetAvgBook(GetAvgBookRatingRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
    }
}
