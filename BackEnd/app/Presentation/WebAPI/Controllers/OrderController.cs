using Application.Features.Books.command.CreateBook;
using Application.Features.Orders.Command.CreateOrder;
using Application.Features.Orders.Command.DeleteOrder;
using Application.Features.Orders.Command.UpdateOrder;
using Azure.Core;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public readonly IMediator mediator;
        private readonly IAuthorizationService authorizationService;
        public OrderController(IMediator mediator, IAuthorizationService authorizationService)
        {
            this.mediator = mediator;
            this.authorizationService = authorizationService;
        }
        [HttpPost]

        public async Task<IActionResult> CreateOrder(CreateOrderCommandRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]
        
        public async Task<IActionResult> UpdateOrder(UpdateOrderCommandRequest request)
        {
            await mediator.Send(request);
            return Ok();
        }
        [HttpPost]
      
        public async Task<IActionResult> DeleteOrder(DeleteOrderCommandRequest request)
        {
            await mediator.Send(request);
            return Ok();
        }

    }
}
