using Application.Interfaces.Reponsitory;
using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace persistence.Interfaces.UnitOfWorks
{
    public interface IUnitOfWork : IAsyncDisposable 
    {
        IReadReponsitories<T> GetReadReponsitory<T>() where T : class, IEntityBase,new();
        IWriteReponsitories<T> GetWriteReponsitory<T>() where T : class, IEntityBase, new();
        Task<int> SaveAsync();
        int Save();
    }
}
