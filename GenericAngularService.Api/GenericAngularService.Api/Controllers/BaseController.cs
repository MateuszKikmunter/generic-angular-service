using AutoMapper;
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
    }
}
