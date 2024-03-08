using Application.Features.Books.command.CreateBook;
using Application.Features.Books.queries.GetAll;
using Application.Features.Carts.Command.CreateCart;
using Application.Features.Carts.Command.DeleteCart;
using Application.Features.Carts.Command.UpdateCart;
using Application.Features.Carts.Queries.GetAllCart;
using Application.Features.Carts.Queries.GetById;
using Application.Features.Carts.Queries.GetByUserId;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        public readonly IMediator mediator;
        private readonly IAuthorizationService authorizationService;
        public CartController(IMediator mediator, IAuthorizationService authorizationService)
        {
            this.mediator = mediator;
            this.authorizationService = authorizationService;
        }
        [HttpGet]

        public async Task<IActionResult> GetAllCart()
        {
            var response = await mediator.Send(new GetAllCartRequest());
            return Ok(response);

        }

        [HttpPost]
        
        public async Task<IActionResult> CreateCart(CreateCartRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]

        public async Task<IActionResult> UpdateCart(UpdateCartRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]

        public async Task<IActionResult> DeleteCart(DeleteCartRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]

        public async Task<IActionResult> GetCartById(GetByIdCartRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]

        public async Task<IActionResult> GetCartByUserId(GetByUserIdRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }

    }
}
