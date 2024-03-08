using Application.Features.Books.command.CreateBook;
using Application.Features.Books.queries.GetAll;
using Application.Features.Recipes.Command.CreateRecipes;
using Application.Features.Recipes.Queries.GetAll;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        public readonly IMediator mediator;
        private readonly IAuthorizationService authorizationService;
        public RecipesController(IMediator mediator, IAuthorizationService authorizationService)
        {
            this.mediator = mediator;
            this.authorizationService = authorizationService;
        }
        [HttpGet]

        public async Task<IActionResult> GetRecipes()
        {
            var response = await mediator.Send(new GetAllRecipesRequest());
            return Ok(response);

        }

        [HttpPost]
        public async Task<IActionResult> CreateRecipes(CreateRecipesCommandRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
    }
}
