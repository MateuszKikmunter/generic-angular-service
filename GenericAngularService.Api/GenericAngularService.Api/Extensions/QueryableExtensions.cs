using System;
using System.Collections.Generic;
using System.Linq;
using GenericAngularService.Api.Helpers.DataTablesServerSideHelpers;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using GenericAngularService.Api.Helpers;
using GenericAngularService.Api.Services.Abstract;

namespace GenericAngularService.Api.Extensions
{
    public static class QueryableExtensions
    {
        public static PagedList<T> ToPagedList<T>(this IQueryable<T> query, DataTablesOptions options)
        {
            return PagedList<T>.Create(query, options);
        }

        public static IQueryable<TEntity> ApplySearch<TEntity>(this IQueryable<TEntity> query, DataTablesOptions options, IList<IPropertyMapping> mappings)
        {
            Expression<Func<TEntity, bool>> expression = null;
            var typeOfString = typeof(string);
            var valueToSearch = options.Search.Value;
            var searchableColumns = options.Columns.Where(c => c.Searchable).ToArray();
            var searchOptions = searchableColumns.Select(c => new
            {
                searchFor = mappings.FirstOrDefault(m => m.DestinationProperty.Equals(c.Data, StringComparison.OrdinalIgnoreCase))?.SourceProperty
            });

            foreach (var option in searchOptions)
            {
                Expression<Func<TEntity, bool>> lambda = null;
                var parameterExpression = Expression.Parameter(typeof(TEntity), "param");
                var member = option.searchFor.Split('.').Aggregate<string, Expression>(parameterExpression, Expression.PropertyOrField);
                var canConvert = CanConvertToType(valueToSearch, member.Type.FullName);

                if (canConvert)
                {
                    var value = ConvertToType(valueToSearch, member.Type.FullName);
                    if (member.Type == typeOfString)
                    {
                        var constant = Expression.Constant(value);
                        var methodInfo = typeOfString.GetMethod("StartsWith", new[] { typeOfString });
                        var call = Expression.Call(member, methodInfo, constant);

                        lambda = Expression.Lambda<Func<TEntity, bool>>(call, parameterExpression);
                    }
                    else
                    {
                        lambda = Expression.Lambda<Func<TEntity, bool>>(Expression.Equal(member, Expression.Constant(value)), parameterExpression);
                    }
                }

                if (lambda != null)
                {
                    expression = expression == null ? lambda : expression.Or(lambda);
                }
            }

            return expression != null ? query.Where(expression) : query;
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

        private static bool CanConvertToType(object value, string type)
        {
            try
            {
                ConvertToType(value, type);
                return true;
            }
            catch
            {
                return false;
            }
        }

        private static dynamic ConvertToType(object value, string type)
        {
            return Convert.ChangeType(value, Type.GetType(type));
        }
    }
}
