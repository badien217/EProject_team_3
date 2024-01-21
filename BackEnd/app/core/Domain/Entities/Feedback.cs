using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Feedback : EntityBase, IEntityBase
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string FeedbackContent { get; set; }
        public DateTime FeedbackDate { get; set; }
        public Feedback() { }
        public Feedback(string name, string email, string phone, string feedbackContent, DateTime feedbackDate)
        {
            Name = name;
            Email = email;
            Phone = phone;
            FeedbackContent = feedbackContent;
            FeedbackDate = feedbackDate;
        }
    }
}
