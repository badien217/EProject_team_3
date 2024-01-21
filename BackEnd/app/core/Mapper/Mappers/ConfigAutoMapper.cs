using Application.Interfaces.AutoMapper;
using AutoMapper;
using AutoMapper.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mappers.Mapper
{
    public class ConfigAutoMapper : IAutoMapper
    {
        public ConfigAutoMapper() { }
        public static List<TypePair> typePairs = new();
        public IMapper mapperContrainer;
        public TDestination Map<TDestination, TSource>(TSource soure, string? ignore = null)
        {
            Config<TDestination, TSource>(5, ignore);
            return mapperContrainer.Map<TSource,TDestination>(soure);
        }

        public IList<TDestination> Map<TDestination, TSource>(IList<TSource> sources, string? ignore = null)
        {
            Config<TDestination, TSource>(5, ignore);
            return mapperContrainer.Map<IList<TSource>, IList<TDestination>>(sources);
        }

        public TDestination Map<TDestination>(object soure, string? ignore = null)
        {
            Config<TDestination, object>(5, ignore);
            return mapperContrainer.Map< TDestination>(soure);
        }

        public IList<TDestination> Map<TDestination>(IList<object> sources, string? ignore = null)
        {
            Config<TDestination, IList<object>>(5, ignore);
            return mapperContrainer.Map<IList<TDestination>>(sources);
        }
        protected void Config<TDestination,TSource>( int depth = 5 ,string? ingore = null)
        {
            var TypePair = new TypePair(typeof(TSource),typeof(TDestination));
            if(typePairs.Any(a => a.DestinationType == TypePair.DestinationType 
            && a.SourceType == TypePair.SourceType) && ingore is null) { return; }
            typePairs.Add(TypePair);
            var config = new MapperConfiguration(cfg =>
            {

                foreach (var item in typePairs)
                {
                    if (ingore is not null)
                    {
                        cfg.CreateMap(item.SourceType, item.DestinationType).MaxDepth(depth).ForMember(ingore, x => x.Ignore()).ReverseMap();
                    }
                    else
                    {
                        cfg.CreateMap(item.SourceType, item.DestinationType).MaxDepth(depth).ReverseMap();
                    }
                }
            });
            mapperContrainer = config.CreateMapper();
        }
    }
}
