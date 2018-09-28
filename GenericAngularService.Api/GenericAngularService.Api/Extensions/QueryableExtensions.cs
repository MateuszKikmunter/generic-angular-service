using System;
using System.Collections.Generic;
using System.Linq;
using GenericAngularService.Api.Helpers.DataTablesServerSideHelpers;
using System.Linq.Dynamic.Core;
using GenericAngularService.Api.Services.Abstract;

namespace GenericAngularService.Api.Extensions
{
    public static class QueryableExtensions
    {
        public static PagedList<T> ToPagedList<T>(this IQueryable<T> query, DataTablesOptions options)
        {
            return PagedList<T>.Create(query, options);
        }

        public static IQueryable<T> ApplySearch<T>(this IQueryable<T> query, DataTablesOptions options)
        {
            return query;
        }

        public static IQueryable<T> ApplySort<T>(this IQueryable<T> query, DataTablesOptions options, IList<IPropertyMapping> mappings)
        {
            if (!options.Order.Any())
            {
                return query;
            }

            var sortableColumns = options.Columns.Where(c => c.Orderable).ToArray();
            if (!sortableColumns.Any())
            {
                return query;
            }

            var sortOptions = options.Order.Select(order => new
            {
                sortBy = mappings.FirstOrDefault(m => string.Equals(m.DestinationProperty, sortableColumns[order.Column].Data, StringComparison.OrdinalIgnoreCase))?.SourceProperty,
                sortDirection = order.GetSortDirection().ToString()
            });

            return sortOptions.Aggregate(query, (current, option) => current.OrderBy($"{option.sortBy} {option.sortDirection}"));
        }
    }
}
