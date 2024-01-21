using Application.Interfaces.AutoMapper;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mappers.Mapper
{
    public class Mapper : Application.Interfaces.AutoMapper.IAutoMapper
    {
        public static List<TypePair> 
        public TDestination Map<TDestination, TSource>(TSource soure, string? ignore = null)
        {
            throw new NotImplementedException();
        }

        public IList<TDestination> Map<TDestination, TSource>(IList<TSource> sources, string? ignore = null)
        {
            throw new NotImplementedException();
        }

        public TDestination Map<TDestination>(object soure, string? ignore = null)
        {
            throw new NotImplementedException();
        }

        public IList<TDestination> Map<TDestination>(IList<object> sources, string? ignore = null)
        {
            throw new NotImplementedException();
        }
    }
}
