using Application.Features.Auths.Command.SendEmail;
using Application.Features.Books.command.CreateBook;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmailController : Controller
    {
        public readonly IMediator mediator;
        private readonly IAuthorizationService authorizationService;
        public EmailController(IMediator mediator, IAuthorizationService authorizationService)
        {
            this.mediator = mediator;
            this.authorizationService = authorizationService;
        }
        [HttpPost]
        
        public async Task<IActionResult> SendEmail(SendEmailCommandAuthsRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }

    }
}
