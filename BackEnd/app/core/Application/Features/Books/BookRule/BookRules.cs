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

            if (book.Any(x => x.Author == requestTitle)) throw new BookTitleMustNotBeSameException();
         
            return Task.CompletedTask;
        }
        public Task CheckId(IList<Book> books,int id)
        {  
            if (books.Any(x => x.Id != id)) throw new BookTitleNotFound();
            return Task.CompletedTask;
        }
        public bool IsIdExists(IList<Book> books, int id)
        {
            return books.Any(x => x.Id == id);
        }
        public Task IdValid(Book? book)
        {
            if(book is null) throw new BookTitleNotFound();
            return Task.CompletedTask;
        }
        public async Task<bool> CheckTitle(string title)
        {
            int minLength = 5;
            if (string.IsNullOrEmpty(title))
            {
                return false;
            }

            if (title.Length < minLength)
            {
                return false;
            }

            return true;
        }
        public async Task<bool> BookTitleNotFound (IList<Book> book,string titile)
        {
            return true;
        } 
    }
}
