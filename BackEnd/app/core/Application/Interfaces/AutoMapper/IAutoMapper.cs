using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.AutoMapper
{
    public interface IAutoMapper
    {
        TDestination Map<TDestination, TSource>(TSource soure,string? ignore = null );
        IList<TDestination> Map <TDestination, TSource>(IList<TSource> sources, string? ignore = null );
        TDestination Map<TDestination>(object soure, string? ignore = null);
        IList<TDestination> Map<TDestination>(IList<object> sources, string? ignore = null);

    }
}
