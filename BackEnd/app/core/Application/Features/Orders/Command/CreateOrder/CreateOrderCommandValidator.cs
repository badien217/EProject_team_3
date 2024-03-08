using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Application.Features.Orders.Command.CreateOrder
{
    public class CreateOrderCommandValidator :AbstractValidator<CreateOrderCommandRequest>
    {
        public CreateOrderCommandValidator() {
            RuleFor(x => x.Email).NotEmpty().EmailAddress().WithName("vui lòng check lại email");
            RuleFor(x => x.Phone).NotEmpty().Must(IsValidPhoneNumberVN).WithName("vui lòng check lại phone");
            RuleFor(x => x.BookId).NotEmpty().WithName("vui lòng check lại id book");
            RuleFor(x => x.Quatity).NotEmpty().GreaterThan(0).WithName("vui lòng check lại số lương");
        }
      
        public static bool IsValidPhoneNumberVN(string phoneNumber)
        {
            if (string.IsNullOrEmpty(phoneNumber))
            {
                return false;
            }
            var regex = @"^(0|\+84)(\d{1,2})(\d{9})$";

            return Regex.IsMatch(phoneNumber, regex);
        }
    }
}
