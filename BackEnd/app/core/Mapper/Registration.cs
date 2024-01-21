using AutoMapper;
using Microsoft.EntityFrameworkCore.SqlServer.Storage.Internal;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces.AutoMapper;
using Mappers;
using Mappers.Mapper;

namespace Mapper
{
    public static class Registration
    {
        public static void AddMapper(this IServiceCollection service) 
        {
            service.AddSingleton<IAutoMapper, ConfigAutoMapper>();
        }
    }
}
