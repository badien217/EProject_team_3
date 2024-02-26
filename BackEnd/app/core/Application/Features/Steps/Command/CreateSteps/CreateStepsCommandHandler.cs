using Application.Bases;
using Application.Features.Books.BookRule;
using Application.Features.Feedbacks.Command.CreateFeedbacks;
using Application.Interfaces.AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using persistence.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Steps.Command.CreateSteps
{
    public class CreateStepsCommandHandler : BaseHandler, IRequestHandler<CreateStepsCommandRequest>
    {

        public readonly IUnitOfWork _unitOfWork;
        public CreateStepsCommandHandler(IUnitOfWork unitOfWork, IAutoMapper mapper, IHttpContextAccessor httpContextAccessor, BookRules bookRules) : base(mapper, unitOfWork, httpContextAccessor)
        {
            _unitOfWork = unitOfWork;
            

        }
        
        public async System.Threading.Tasks.Task Handle(CreateStepsCommandRequest request, CancellationToken cancellationToken)
        {
            Step steps = new(request.Content, request.ImageUrl, request.RecipeId);
            await _unitOfWork.GetWriteReponsitory<Step>().AddAsync(steps);
            await _unitOfWork.SaveAsync();
        }
    }
}

   

