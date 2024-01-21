using Application.Interfaces.Reponsitory;
using persistence.Context;
using persistence.Repositories;
using Application.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace persistence.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AddDbContexts _dbContext;
        public UnitOfWork(AddDbContexts dbContext)
        {
            this._dbContext = dbContext;
        }
        public async ValueTask DisposeAsync() => await _dbContext.DisposeAsync();


        public  int Save() => _dbContext.SaveChanges(); 
       

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();


        IReadReponsitories<T> IUnitOfWork.GetReadReponsitory<T>() => new ReadRepositories<T>(_dbContext);
       

        IWriteReponsitories<T> IUnitOfWork.GetWriteReponsitory<T>() => new WriteReponsitory<T>(_dbContext);
        
    }
}
