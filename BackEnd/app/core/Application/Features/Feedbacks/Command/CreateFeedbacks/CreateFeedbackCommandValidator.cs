using FluentValidation;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Application.Features.Feedbacks.Command.CreateFeedbacks
{
    public class CreateFeedbackCommandValidator : AbstractValidator<CreateFeedbackCommandRequest>
    {
        public CreateFeedbackCommandValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Phone).NotEmpty().Must(IsValidPhoneNumberVN).WithName("vui lòng check phone");
            RuleFor(x => x.FeedbackContent).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.FeedbackDate).NotEmpty();
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
