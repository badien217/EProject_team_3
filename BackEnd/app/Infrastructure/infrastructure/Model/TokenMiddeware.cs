using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace infrastructure.Model
{
    public class TokenMiddeware
    {
        private readonly RequestDelegate _next;
        private readonly TokenModels _tokenService;
        public TokenMiddeware(RequestDelegate next, TokenModels tokenService)
        {
            _next = next;
            _tokenService = tokenService;
        }
        public async Task  Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (!string.IsNullOrEmpty(token))
            {
            
                _tokenService.Token = token;
            }

            await _next(context);
        }
    }
}
