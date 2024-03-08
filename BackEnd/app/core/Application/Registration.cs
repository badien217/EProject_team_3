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
using FluentValidation;
using System.Globalization;
using MediatR;
using Domain.Entities;
using Application.Features.Books.BookRule;
using Application.Features.Books.command.CreateBook;
using Application.Behevior;
using Microsoft.Extensions.Configuration;
using SendGrid.Helpers.Mail;
using Application.Features.Auths.Command.SendEmail;

namespace Application
{
    public static class Registration
    {
        public static void AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            var assembly = Assembly.GetExecutingAssembly();
            services.AddTransient<ExceptionMiddleware>();
            services.AddRulesFromAssemblyContaining(assembly, typeof(BaseRule));
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(assembly));
            services.Configure<SendMailCommandAuthsSettings>(configuration.GetSection("MailSetting"));
            services.AddValidatorsFromAssembly(assembly);
            ValidatorOptions.Global.LanguageManager.Culture = new CultureInfo("tr");
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(FluentValidationBehevior<,>));



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
