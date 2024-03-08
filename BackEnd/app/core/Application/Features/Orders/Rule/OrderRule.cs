using Application.Bases;
using Azure.Core;
using Domain.Entities;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Orders.Rule
{
    public class OrderRule : BaseRule
    {
        public async Task<bool> checkIdOfOrder(IList<Order> details,int requestId)
        {
            bool check = false;
            if (details.Any(x => x.Id == requestId))
            {
                check = true;
                return check;
            }
            return false;
           
        }
    }
}
