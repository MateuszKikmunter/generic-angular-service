using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GenericAngularService.Api.Entities.Config
{
    public class CompanyConfig : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Id).ValueGeneratedOnAdd();

            builder.Property(c => c.Name).IsRequired().HasMaxLength(255);
            builder.Property(c => c.Industry).IsRequired().HasMaxLength(155);
            builder.Property(c => c.Founded).IsRequired();
            builder.HasMany(c => c.Employees).WithOne(e => e.Company).OnDelete(DeleteBehavior.SetNull);

            builder.ToTable("Companies");
        }
    }
}
