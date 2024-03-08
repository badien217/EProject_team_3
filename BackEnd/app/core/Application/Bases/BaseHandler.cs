using Application.Interfaces.AutoMapper;
using Microsoft.AspNetCore.Http;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Application.Bases
{
    public class BaseHandler
    {
        public readonly IAutoMapper mapper;
        public readonly IUnitOfWork unitOfWork;
        public readonly IHttpContextAccessor httpContextAccessor;
        public readonly  string userId;
        

        public BaseHandler(IAutoMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.httpContextAccessor = httpContextAccessor;
            userId =httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
          
           
            
        }
    }
}

