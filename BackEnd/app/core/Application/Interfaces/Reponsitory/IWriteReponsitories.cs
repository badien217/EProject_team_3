using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Domain.Entities;

namespace Application.Interfaces.Reponsitory
{
     public interface IWriteReponsitories<T> where T : class ,IEntityBase, new()
    {
        Task AddAsync(T entity);
        Task AddRangerAsync(IList<T> entities);
        Task HardDeleteAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task HardDeleteRangerAsync(IList<T> entity);
       
    }
}
