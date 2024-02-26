using Application.Features.Auths.Command.Login;
using Application.Features.Auths.Command.RefreshToken;
using Application.Features.Auths.Command.Register;
using Application.Features.Auths.Command.RegisterAdmin;
using Application.Features.Auths.Queries.GetProfileQueries;
using Application.Features.Feedbacks.Command.CreateFeedbacks;
using Application.Features.Orders.Command.CreateOrder;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController1 : ControllerBase
    {
        private readonly IMediator mediator;
        public ValuesController1(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> AuthRegister(RegisterCommandRequest requeste)
        {
            await mediator.Send(requeste);
            return StatusCode(StatusCodes.Status201Created);
        }
        [HttpPost]
        public async Task<IActionResult> AuthRegisterAdmin(RegisterAdminCommandRequest requeste)
        {
            await mediator.Send(requeste);
            return StatusCode(StatusCodes.Status201Created);
        }
        [HttpPost]
        public async Task<IActionResult> login(LoginCommandRequest requeste)
        {
           var reponser = await mediator.Send(requeste);
            return StatusCode(StatusCodes.Status200OK,reponser);
        }
        [HttpPost]
        public async Task<IActionResult> refrestoken(RefreshTokenCommandRequest requeste)
        {
            var reponser = await mediator.Send(requeste);
            return StatusCode(StatusCodes.Status200OK, reponser);
        }
        [HttpPost]
        public async Task<IActionResult> getid(GetProfileQueriesRequest requeste)
        {
            var reponser = await mediator.Send(requeste);
            return StatusCode(StatusCodes.Status200OK, reponser);
        }
        [HttpPost]
        public async Task<IActionResult> orderCon(CreateOrderCommandRequest requeste)
        {
            var reponser = await mediator.Send(requeste);
            return StatusCode(StatusCodes.Status200OK, reponser);
        }
    }
}
