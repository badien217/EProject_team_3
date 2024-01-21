using Application.DTOs;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Users.command.CreateUser
{
    public class CreateUserCommandRequest :IRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string phone { get; set; }
        public string SubcriptionType { get; set; }
        public bool PaymentStatus { get; set; }
        public int RoleId { get; set; }
        public IList<int> RoleIds { get; set; }
    }
}
