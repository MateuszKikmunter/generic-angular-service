CREATE DATABASE AngularGenericService;

GO

CREATE TABLE [AngularGenericService].[dbo].[Companies] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    [Industry] nvarchar(155) NOT NULL,
    [Founded] datetimeoffset NOT NULL,
    CONSTRAINT [PK_Companies] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [AngularGenericService].[dbo].[Employees] (
    [Id] int NOT NULL IDENTITY,
    [FirstName] nvarchar(255) NOT NULL,
    [LastName] nvarchar(255) NOT NULL,
    [Email] nvarchar(255) NOT NULL,
    [Active] bit NOT NULL,
    [CompanyId] int NULL,
    CONSTRAINT [PK_Employees] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Employees_Companies_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [AngularGenericService].[dbo].[Companies] ([Id]) ON DELETE SET NULL
);

GO

CREATE INDEX [IX_Employees_CompanyId] ON [AngularGenericService].[dbo].[Employees] ([CompanyId]);

GO