using Application.Bases;
using Application.Exceptions;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public static class Registration
    {
        public static void AddApplication(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();
            services.AddTransient<ExceptionMiddleware>();
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(assembly));
            services.AddTransient<ExceptionMiddleware>();
            services.AddRulesFromAssemblyContaining(assembly, typeof(BaseRule));
        }
        private static IServiceCollection AddRulesFromAssemblyContaining(
           this IServiceCollection services,
           Assembly assembly,
           Type type)
        {
            var types = assembly.GetTypes().Where(t => t.IsSubclassOf(type) && type != t).ToList();
            foreach (var item in types)
                services.AddTransient(item);

            return services;
        }
    }
}
