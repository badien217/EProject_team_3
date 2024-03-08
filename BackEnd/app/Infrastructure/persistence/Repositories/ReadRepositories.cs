using Application.Interfaces.Reponsitory;
using Domain.Common;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using persistence.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace persistence.Repositories
{
    public class ReadRepositories<T> : IReadReponsitories<T> where T : class, IEntityBase, new()
    {
        private readonly AddDbContexts _dbContext;
        public ReadRepositories(AddDbContexts dbContext)
        {
            this._dbContext = dbContext;
        }
        private DbSet<T> table { get => _dbContext.Set<T>(); }
        public async Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null)
        {
            table.AsNoTracking();
            if(predicate is not null) { table.Where(predicate); }
            return await table.CountAsync();

        }

        public async Task<IQueryable<T>> Find(Expression<Func<T, bool>> predicate, bool enableTracking = false)
        {
            if (!enableTracking) table.AsNoTracking();
            return  table.Where(predicate);
        }

        public async Task<IList<T>> GetAllAsync(Expression<Func<T, bool>>? predicate = null, Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, bool enableTracking = false)
        {
            IQueryable<T> queryTable = table;
            if (!enableTracking)
            {
                queryTable = queryTable.AsNoTracking();

            }
            if(include is not null) { queryTable = include(queryTable); }
            if(predicate is not null) { queryTable = queryTable.Where(predicate); }
            if(orderBy is not null) { return await orderBy(queryTable).ToListAsync(); }
            return await queryTable.ToListAsync();
        }

        public async Task<IList<T>> GetAllAsyncPacing(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, bool enableTracking = false, int curentPage = 1, int pageSize = 5)
        {
            IQueryable<T> queryTable = table;
            if (!enableTracking)
            {
                queryTable = queryTable.AsNoTracking();

            }
            if (include is not null) { queryTable = include(queryTable); }
            if (predicate is not null) { queryTable = queryTable.Where(predicate); }
            if (orderBy is not null) { return await orderBy(queryTable)
                    .Skip((curentPage-1) * pageSize)
                    .Take(pageSize).ToListAsync() ; }
            return await queryTable.Skip((curentPage - 1) * pageSize)
                    .Take(pageSize).ToListAsync(); ;
        }

        public async Task<T> GetAsync(Expression<Func<T, bool>> predicate, Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null, bool enableTracking = false)
        {
            IQueryable<T> queryTable = table;
            if (!enableTracking)
            {
                queryTable = queryTable.AsNoTracking();

            }
            if (include is not null) { queryTable = include(queryTable); }
            return await queryTable.FirstOrDefaultAsync(predicate);
        }
    }
}
