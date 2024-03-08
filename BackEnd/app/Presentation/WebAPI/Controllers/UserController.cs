using Application.Features.Auths.Command.Profile.DeleteProfile;
using Application.Features.Auths.Command.Profile.UpdateProfile.ChangePassword;
using Application.Features.Auths.Command.Profile.UpdateProfile.UpdateProfileUser;
using Application.Features.Auths.Queries.GetProfileQueries;
using Application.Features.Books.command.CreateBook;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IMediator mediator;
        private readonly IAuthorizationService authorizationService;
        public UserController(IMediator mediator, IAuthorizationService authorizationService) {
            this.mediator = mediator;
            this.authorizationService = authorizationService;
        }
        [HttpPost]
        public async Task<IActionResult> GetUserProfile(GetProfileQueriesRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> ChangePassWord(ChangePasswordRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> UpdateProfile(UpdateProfileUserRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
        [HttpPost]      
        public async Task<IActionResult> DeleteUser(DeleteProfileCommandRequest requeste)
        {
            await mediator.Send(requeste);
            return Ok();
        }
    }
}
