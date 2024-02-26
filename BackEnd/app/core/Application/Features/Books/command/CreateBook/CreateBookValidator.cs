using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Books.command.CreateBook
{
    public class CreateBookValidator : AbstractValidator<CreateBookCommandRequest>
    {
        public CreateBookValidator() {

            RuleFor(x => x.Title).NotEmpty().Must(checkTitle).WithName("check title");
            RuleFor(x => x.Author).NotEmpty();
            RuleFor(x => x.PublishedDate).NotEmpty();
            RuleFor(x => x.ImageUrl).NotEmpty();
            RuleFor(x => x.Price).NotEmpty().Must(CheckPrice).WithName("please check price");
        }
        private bool checkTitle(string Title)
        {
            int lenght = 5;
            if(Title is null)
            {
                return false;
            }
            if (Title.Length < lenght) {
                return false;
            }
            return true;
            
        }
        private bool CheckPrice(decimal Price) {
            string priceString = Price.ToString();

            foreach (char c in priceString)
            {
                if (char.IsLetter(c))
                {
                    return false;
                }
            }
            return true;
        }
    }
}
