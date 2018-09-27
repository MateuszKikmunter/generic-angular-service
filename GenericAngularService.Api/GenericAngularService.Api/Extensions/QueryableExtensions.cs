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
        public static PagedList<T> ToPagedList<T>(this IQueryable<T> query, DataTableAjaxPostModel paginationModel)
        {
            return PagedList<T>.Create(query, paginationModel);
        }

        public static IQueryable<T> ApplySearch<T>(this IQueryable<T> query, DataTableAjaxPostModel dataTablesAjaxPostModel)
        {
            return query;
        }

        public static IQueryable<T> ApplySort<T>(this IQueryable<T> query, DataTableAjaxPostModel dataTableAjaxPostModel, IList<IPropertyMapping> mappings)
        {
            if (!dataTableAjaxPostModel.Order.Any())
            {
                return query;
            }

            var sortableColumns = dataTableAjaxPostModel.Columns.Where(c => c.Orderable).ToArray();
            var sortOptions = dataTableAjaxPostModel.Order.Select(order => new
            {
                sortBy = mappings.FirstOrDefault(m => string.Equals(m.DestinationProperty, sortableColumns[order.Column].Data, StringComparison.OrdinalIgnoreCase))?.SourceProperty,
                sortDirection = order.GetSortDirection().ToString()
            });

            return sortOptions.Aggregate(query, (current, option) => current.OrderBy($"{option.sortBy} {option.sortDirection}"));
        }
    }
}
