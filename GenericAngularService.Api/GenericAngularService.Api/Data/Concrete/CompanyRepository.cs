﻿using GenericAngularService.Api.Data.Abstract;
using GenericAngularService.Api.Entities;

namespace GenericAngularService.Api.Data.Concrete
{
    public class CompanyRepository : Repository<Company>, ICompanyRepository
    {
        public CompanyRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
