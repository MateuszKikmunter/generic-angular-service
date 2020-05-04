declare @FacebookId int = (select id from AngularGenericService.dbo.Companies where name = 'Facebook');
declare @MicrosoftId int = (select id from AngularGenericService.dbo.Companies where name = 'Microsoft');
declare @AppleId int = (select id from AngularGenericService.dbo.Companies where name = 'Apple');
declare @OracleId int = (select id from AngularGenericService.dbo.Companies where name = 'Oracle');
declare @AmazonId int = (select id from AngularGenericService.dbo.Companies where name = 'Amazon');
declare @IbmId int = (select id from AngularGenericService.dbo.Companies where name = 'IBM');

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Markus', 'Zucker', 'markus.zucker@facebook.com', 1, @FacebookId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('John', 'Micro', 'john.micro@microsoft.com', 1, @MicrosoftId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Steve', 'Stevenson', 'steve.stevenson@microsoft.com', 1, @MicrosoftId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Kathy', 'Apple', 'kathy.apple@appleinc.com', 1, @AppleId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('James', 'Jones', 'james.jones@appleinc.com', 1, @AppleId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Conor', 'Bundy', 'conor.bundy@appleinc.com', 1, @AppleId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Tony', 'Goodman', 'tony.Goodman@appleinc.com', 1, @AppleId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Bill', 'Bell', 'bill.bell@oracle.com', 1, @OracleId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('John', 'Kemper', 'john.kemper@oracle.com', 1, @OracleId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Mia', 'Oracleson', 'Mia.Oracleson@microsoft.com', 1, @MicrosoftId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Marcy', 'Grape', 'marcy.grape@microsoft.com', 1, @MicrosoftId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Foo', 'Bar', 'foo.bar@ibm.com', 1, @IbmId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Mike', 'Hannigan', 'Mike.Hannigan@ibm.com', 1, @IbmId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Phoebe', 'Gardner', 'phoebe.gardner@ibm.com', 1, @IbmId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Don', 'Douglas', 'don.douglas@amazon.com', 1, @AmazonId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Bud', 'Weiser', 'bud.weiser@amazon.com', 1, @AmazonId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Kelly', 'Mills', 'kelly.mills@amazon.com', 1, @AmazonId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Jeff', 'Keff', 'jeff.keff@amazon.com', 1, @AmazonId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Denise', 'Lawrence', 'denise.lawrence@facebook.com', 1, @FacebookId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Bob', 'Bobbatron', 'bob.bobbatron@facebook.com', 1, @FacebookId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Zoe', 'Zuckerman', 'zoe.zuckerman@facebook.com', 1, @FacebookId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Andy', 'Anderson', 'andy.anderson@ibm.com', 1, @IbmId);

INSERT INTO AngularGenericService.dbo.Employees
VALUES ('Matt', 'Kick', 'matt.kick@microsoft.com', 1, @MicrosoftId);
