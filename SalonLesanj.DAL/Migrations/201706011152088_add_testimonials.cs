namespace SalonLesanj.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_testimonials : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Testimonials",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Author = c.String(nullable: false, maxLength: 1024),
                        Email = c.String(nullable: false, maxLength: 1024),
                        ImageUrl = c.String(nullable: false, maxLength: 1024),
                        Text = c.String(nullable: false, maxLength: 4096),
                        CreationTime = c.DateTime(nullable: false),
                        IsApproved = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AlterColumn("dbo.Dresses", "ImageUrl2", c => c.String(maxLength: 1024));
            AlterColumn("dbo.Dresses", "ImageUrl3", c => c.String(maxLength: 1024));
            AlterColumn("dbo.Dresses", "Description", c => c.String(maxLength: 2048));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Dresses", "Description", c => c.String(nullable: false, maxLength: 2048));
            AlterColumn("dbo.Dresses", "ImageUrl3", c => c.String(nullable: false, maxLength: 1024));
            AlterColumn("dbo.Dresses", "ImageUrl2", c => c.String(nullable: false, maxLength: 1024));
            DropTable("dbo.Testimonials");
        }
    }
}
