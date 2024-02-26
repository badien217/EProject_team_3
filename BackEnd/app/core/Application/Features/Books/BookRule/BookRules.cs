using Application.Bases;
using Application.Features.Books.Exception;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Books.BookRule
{
    public class BookRules : BaseRule
    {
        public Task BookTitleMostNotBeSame(IList<Book> book, string requestTitle)
        {

            if (book.Any(x => x.Title == requestTitle)) throw new BookTitleMustNotBeSameException();
            return Task.CompletedTask;
        }
        public async Task<bool> BookTitleNotFound(IList<Book> book, string requestTitle)
        {
            if(book.Any(x => x.Title != requestTitle))
            {
                return true;
            } 
            return false;
            
        }
    }
}
