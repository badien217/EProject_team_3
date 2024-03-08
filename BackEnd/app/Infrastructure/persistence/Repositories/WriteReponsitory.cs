using Application.Interfaces.Reponsitory;
using Domain.Common;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using persistence.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace persistence.Repositories
{
    public class WriteReponsitory<T> : IWriteReponsitories<T> where T:class ,IEntityBase, new()
    {
        private readonly AddDbContexts _dbContext;
        public WriteReponsitory(AddDbContexts dbContext)
        {
            this._dbContext = dbContext;
        }
        private DbSet<T> Table { get => _dbContext.Set<T>(); }

        public async Task AddAsync(T entity)
        {
            await Table.AddAsync(entity);
        }

        public async Task AddRangerAsync(IList<T> entities)
        {
            await Table.AddRangeAsync(entities);
        }
        public async Task HardDeleteRangerAsync(IList<T> entity)
        {
            await Task.Run(() => { Table.RemoveRange(entity); });

        }

        public async Task HardDeleteAsync(T entity)
        {
           await Task.Run(() => { Table.Remove(entity); });
           
        }
        public async Task<T> UpdateAsync(T entity)
        {
            await Task.Run(()=> Table.Update(entity));
            return entity;
        }
    }
}
