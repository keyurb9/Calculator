USE [customer]
GO

/****** Object:  Table [dbo].[Client]    Script Date: 6/05/2024 12:43:23 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE IF EXISTS [dbo].[StripeClient]
GO

DROP TABLE IF EXISTS [dbo].[Client]
GO

CREATE TABLE [dbo].[Client](
	[ClientId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](100) NOT NULL,
	[CardNo] [nvarchar](20) NOT NULL,
	[Expiry] [nvarchar](6) NOT NULL,
	[Cvc] [int] NOT NULL,
	[Country] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[ClientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

INSERT INTO [dbo].[Client]
           ([Name]
           ,[Email]
           ,[Password]
           ,[CardNo]
           ,[Expiry]
           ,[Cvc]
           ,[Country])
     VALUES
           ('Keyur Bhavsar',
           'keyur2k2@gmail.com',
           'dummy12345',
           '1345',
           '1245',
           123,
           'Australia');
GO