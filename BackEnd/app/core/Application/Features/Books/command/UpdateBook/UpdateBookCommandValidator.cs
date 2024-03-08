using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Application.Features.Books.command.UpdateBook
{
    public class UpdateBookCommandValidator : AbstractValidator<UpdateBookCommandReuquest>
    {
        public UpdateBookCommandValidator() {
            RuleFor(x => x.ImageUrl).Must(x => Regex.IsMatch(x, @"^.+(\.jpg|\.png)$"))
                .WithMessage("Hình ảnh chỉ được phép có đuôi .jpg hoặc .png");
        } 
    }
}
