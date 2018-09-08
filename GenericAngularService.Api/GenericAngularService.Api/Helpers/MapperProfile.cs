using AutoMapper;
using GenericAngularService.Api.Dtos;
using GenericAngularService.Api.Entities;

namespace GenericAngularService.Api.Helpers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Employee, EmployeeDto>().ForMember(e => e.Company, opts => opts.MapFrom(e => e.Company.Name));
        }
    }
}
