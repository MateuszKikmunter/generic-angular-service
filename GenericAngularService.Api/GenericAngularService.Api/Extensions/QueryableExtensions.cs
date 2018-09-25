using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using GenericAngularService.Api.Helpers.DataTablesServerSideHelpers;
using System.Linq.Dynamic.Core;

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

        public static IQueryable<T> ApplySort<T>(this IQueryable<T> query, DataTableAjaxPostModel dataTableAjaxPostModel)
        {
            if (!dataTableAjaxPostModel.Order.Any())
            {
                return query;
            }

            var columnsToSort = dataTableAjaxPostModel.Columns.Where(c => c.Orderable).ToArray();
            var sortOptions = dataTableAjaxPostModel.Order.Select(order => new
            {
                sortBy = columnsToSort[order.Column].Data,
                sortDirection = order.GetSortDirection().ToString()
            });

            return sortOptions.Aggregate(query, (current, option) => current.OrderBy($"{option.sortBy} {option.sortDirection}"));
        }
    }
}
