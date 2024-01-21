using Application.Features.Users.command.CreateUser;
using Application.Features.Users.queries.GetAllUser;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class testApiController : ControllerBase
    {
        private readonly IMediator _mediator;
        public testApiController(IMediator mediator)
        {
            this._mediator = mediator;

        }
        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            var reponse = await _mediator.Send(new GetAllUserQueryRequest());
            return Ok(reponse);

        }
        [HttpPost]
        public async Task<IActionResult>CreateUser(CreateUserCommandRequest request)
        {
            await _mediator.Send(request);
            return Ok();
        }
    }
}
