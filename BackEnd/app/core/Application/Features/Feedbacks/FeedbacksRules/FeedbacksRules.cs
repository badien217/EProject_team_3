using Application.Bases;
using Application.Features.Books.Exception;
using Application.Features.Feedbacks.Exception;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Feedbacks.FeedbacksRules
{
    public class FeedbacksRules : BaseRule
    {
        public Task FeedbacksphonesMostNotBeSame(IList<Feedback> feedback, string requestphone)
        {

            if (feedback.Any(x => x.Phone == requestphone)) throw new FeedbacksphoneNotBeSameException();
            return Task.CompletedTask;

        }
        public async Task<bool> FeedbacksphoneNotFound(IList<Feedback> feedback, string requestphone)
        {
            if (feedback.Any(x => x.Phone != requestphone))
            {
                return true;
            }
            return false;

        }
    }
}
