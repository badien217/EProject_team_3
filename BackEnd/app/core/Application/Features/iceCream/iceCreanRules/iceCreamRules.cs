using Application.Bases;
using Application.Features.Feedbacks.Exception;
using Application.Features.iceCream.Exception;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Application.Features.iceCream.iceCreanRules
{
    public class iceCreamRules : BaseRule
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
