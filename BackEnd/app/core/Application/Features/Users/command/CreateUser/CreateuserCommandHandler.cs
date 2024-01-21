using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs;
using Application.Interfaces.UnitOfWorks;
using Domain.Entities;
using MediatR;
using Microsoft.Exchange.WebServices.Data;


namespace Application.Features.Users.command.CreateUser
{
    public class CreateuserCommandHandler : IRequestHandler<CreateUserCommandRequest>
    {
        public IUnitOfWork _unitOfWork;
        public CreateuserCommandHandler() { }
        public CreateuserCommandHandler(IUnitOfWork unitOfWork) {
            this._unitOfWork = unitOfWork;
        
        }

        public async System.Threading.Tasks.Task Handle(CreateUserCommandRequest request, CancellationToken cancellationToken)
        {
            User userCustomer = new(request.Username, request.Password, request.phone, request.Email, request.SubcriptionType,
                request.PaymentStatus, request.RoleId);
            await _unitOfWork.GetWriteReponsitory<User>().AddAsync(userCustomer);
           if( await _unitOfWork.SaveAsync()> 0)
            {
                await _unitOfWork.GetWriteReponsitory<Role>().AddAsync(new()
                {
                    User = userCustomer,
                    

                });
                await _unitOfWork.SaveAsync();

            }
        }
    }
}
