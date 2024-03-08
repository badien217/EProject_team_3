using Application.Features.Books.command.CreateBook;
using Application.Features.Books.queries.GetAll;
using Application.Features.Faqs.Command.CreateFaq;
using Application.Features.Faqs.Command.DeleteFaq;
using Application.Features.Faqs.Command.UpdateFaq;
using Application.Features.Faqs.Queries.GetAllFaq;
using Application.Features.Faqs.Queries.GetById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FaqController : ControllerBase
    {
        public readonly IMediator mediator;
        private readonly IAuthorizationService authorizationService;
        public FaqController(IMediator mediator, IAuthorizationService authorizationService)
        {
            this.mediator = mediator;
            this.authorizationService = authorizationService;
        }
        [HttpGet]

        public async Task<IActionResult> GetAllFaq()
        {
            var response = await mediator.Send(new GetAllFaqRequest());
            return Ok(response);

        }

        [HttpPost]
        public async Task<IActionResult> CreateFaq(CreateFadRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> UpdateFaq(UpdateFaqRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> DeleteFaq(DeleteFaqRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> GetFaqById(GetByIdFaqRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
    }
}
