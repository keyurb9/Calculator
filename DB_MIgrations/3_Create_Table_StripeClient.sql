USE [customer]
GO

/****** Object:  Table [dbo].[StripeClient]    Script Date: 6/05/2024 12:47:22 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE IF EXISTS [dbo].[StripeClient]
GO

CREATE TABLE [dbo].[StripeClient](
	[CustomerId] [int] IDENTITY(1,1) NOT NULL,
	[ClientId] [int] NOT NULL,
	[StripeCustomerId] [varchar](50) NOT NULL,
 CONSTRAINT [PK_stripeClient] PRIMARY KEY CLUSTERED 
(
	[CustomerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[StripeClient]  WITH CHECK ADD  CONSTRAINT [FK_StripeClient_Client] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Client] ([ClientId])
GO

ALTER TABLE [dbo].[StripeClient] CHECK CONSTRAINT [FK_StripeClient_Client]


INSERT INTO [dbo].[StripeClient]
           ([ClientId]
           ,[StripeCustomerId])
     VALUES
           (
		   1,
           'cus_Q3Abjg70hZmczF')

GO