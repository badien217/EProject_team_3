using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auths.Queries.GetProfileQueries
{
    public class GetProfileQueriesReponse 
    {
        public string Phone { get; set; }
        public string subscriptionType { get;set; }

        public string paymentOption { get;set; }
    }
}
