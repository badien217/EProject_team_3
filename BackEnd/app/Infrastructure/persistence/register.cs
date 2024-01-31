using Application.Interfaces.Reponsitory;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using persistence.Context;
using persistence.Repositories;
using persistence.Interfaces.UnitOfWorks;

using persistence.UnitOfWorks;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace persistence
{
   public static class register
    {
        public static void AddPersistence(this IServiceCollection services , IConfiguration configuration) {
            
            services.AddDbContext<AddDbContexts>(opt => 
            opt.UseSqlServer(configuration.GetConnectionString("DefaultConnect")));
            services.AddScoped(typeof(IReadReponsitories<>), typeof(ReadRepositories<>));
            services.AddScoped(typeof(IWriteReponsitories<>), typeof(WriteReponsitory<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddIdentityCore<User>(
                opt =>
                {
                    opt.Password.RequireNonAlphanumeric = false;
                    opt.Password.RequiredLength = 2;
                    opt.Password.RequireLowercase = false;
                    opt.Password.RequireUppercase = false;
                    opt.Password.RequireDigit = false;
                    opt.SignIn.RequireConfirmedEmail = false;

                }).AddRoles<Role>().AddEntityFrameworkStores<AddDbContexts>();
        }
    }
}
