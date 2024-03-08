using Application.Features.Books.command.CreateBook;
using Application.Features.Books.queries.GetAll;
using Application.Features.Products.command.CreateProduct;
using Application.Features.Products.command.DeleteProduct;
using Application.Features.Products.command.UpdateProduct;
using Application.Features.Products.queries.GetId;
using Application.Features.Products.queries.GetTotal;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController :ControllerBase
    {
        public readonly IMediator mediator;
        private readonly IAuthorizationService authorizationService;
        public ProductController(IMediator mediator, IAuthorizationService authorizationService)
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
        [HttpGet]

        public async Task<IActionResult> GetTotal()
        {
            var response = await mediator.Send(new GetTotalProductRequest());
            return Ok(response);

        }

        [HttpPost]
        
        public async Task<IActionResult> CreateProduct(CreateProductRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]

        public async Task<IActionResult> UpdateProduct(UpdateProductRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]

        public async Task<IActionResult> DeleteProduct(DeleteProductRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]

        public async Task<IActionResult> GetProductById(GetIdProductRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
    }
}
