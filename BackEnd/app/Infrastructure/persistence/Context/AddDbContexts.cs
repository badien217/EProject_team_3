﻿using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace persistence.Context
{
    public class AddDbContexts : IdentityDbContext<User,Role,Guid>
    {
        public AddDbContexts() { }

        public AddDbContexts(DbContextOptions options) : base(options)
        {
        }

        
        public DbSet<Book> Books { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Flavor> Flavor { get; set; }
        public DbSet<IceCream> IceCreams { get;set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderDetail> OrderDetail { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
    
        public DbSet<Step> Steps { get; set; }
       protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
        


    }
}
