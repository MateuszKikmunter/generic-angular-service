using AutoMapper;
using GenericAngularService.Api.Helpers.DataTablesServerSideHelpers;
using Microsoft.AspNetCore.Mvc;

namespace GenericAngularService.Api.Controllers
{
    public class BaseController : ControllerBase
    {
        protected readonly IMapper _mapper;
        public BaseController(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected OkObjectResult DataTablesResult<T>(PagedList<T> paginatedItems)
        {
            return Ok(new
            {
                recordsTotal = paginatedItems.TotalCount,
                recordsFiltered = paginatedItems.TotalCount,
                data = paginatedItems
            });
        }
    }
}
