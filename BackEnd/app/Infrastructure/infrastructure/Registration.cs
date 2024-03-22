﻿using Application.Interfaces.RedisCache;
using Application.Interfaces.SendMessage;
using Application.Interfaces.Token;
using infrastructure.RabbitMq;
using infrastructure.RedisCache;
using infrastructure.Token;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace infrastructure
{
    public static class Registration
    {
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<TokenSetting>(configuration.GetSection("JWT"));
            services.AddTransient<ITokenServices, TokenServices>();
            services.AddScoped<ISendMessageRabbitMQ, SendMessage>();

            services.Configure<RedisCacheSettings>(configuration.GetSection("RedisCacheSettings"));
            services.AddTransient<IRedisCache, RedisCacheService>();

            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, opt =>
            {
                opt.SaveToken = true;
                opt.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"])),
                    ValidateLifetime = false,
                    ValidIssuer = configuration["JWT:Issuer"],
                    ValidAudience = configuration["JWT:Audience"],
                    ClockSkew = TimeSpan.Zero
                };
            });
            
            services.AddStackExchangeRedisCache(opt =>
            {
                opt.Configuration = configuration["RedisCacheSettings:ConnectionString"];
                opt.InstanceName = configuration["RedisCacheSettings:InstanceName"];
            });
        }
    }
}
