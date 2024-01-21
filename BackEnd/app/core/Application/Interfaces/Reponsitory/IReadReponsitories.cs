using Domain.Common;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Reponsitory
{
    public interface IReadReponsitories<T> where T : class, IEntityBase,new()
    {
        Task<IList<T>> GetAllAsync(Expression<Func<T, bool>> ?predicate = null,

            Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null,
            Func<IQueryable<T>,IOrderedQueryable<T>> ? orderBy = null,
            bool enableTracking  = false);
        Task<IList<T>> GetAllAsyncPacing(Expression<Func<T, bool>> predicate = null,

            Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null,
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
            bool enableTracking = false, int curentPage = 1 ,int pageSize = 5);
        Task<T> GetAsync(Expression<Func<T, bool>> predicate = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null,
            bool enableTracking = false);
        Task<IQueryable<T>> Find(Expression<Func<T, bool>> predicate, bool enableTracking = false);
        Task<int> CountAsync(Expression<Func<T, bool>> ?predicate = null );
    }
}
