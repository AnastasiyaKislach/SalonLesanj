namespace SalonLesanj.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class required : DbMigration
    {
        public override void Up()
        {
			//CreateTable(
			//	"dbo.Settings",
			//	c => new {
			//		Id = c.Int(nullable: false, identity: true),
			//		Key = c.String(),
			//		Value = c.String(),
			//	})
			//	.PrimaryKey(t => t.Id);

			//AddColumn("dbo.Appointments", "ApprovedDate", c => c.DateTime(nullable: false));
			//AddColumn("dbo.News", "PreviewContent", c => c.String(nullable: false, maxLength: 2048));
			//AlterColumn("dbo.Accessories", "Description", c => c.String(maxLength: 2048));
			AlterColumn("dbo.Dresses", "ImageUrl2", c => c.String(maxLength: 1024));
			AlterColumn("dbo.Dresses", "ImageUrl3", c => c.String(maxLength: 1024));
			AlterColumn("dbo.Dresses", "Description", c => c.String(maxLength: 2048));
			//AlterColumn("dbo.News", "Content", c => c.String(maxLength: 2048));
        }
        
        public override void Down()
        {
			//AlterColumn("dbo.News", "Content", c => c.String(nullable: false, maxLength: 2048));
            AlterColumn("dbo.Dresses", "Description", c => c.String(nullable: false, maxLength: 2048));
            AlterColumn("dbo.Dresses", "ImageUrl3", c => c.String(nullable: false, maxLength: 1024));
            AlterColumn("dbo.Dresses", "ImageUrl2", c => c.String(nullable: false, maxLength: 1024));
			//AlterColumn("dbo.Accessories", "Description", c => c.String(nullable: false, maxLength: 2048));
			//DropColumn("dbo.News", "PreviewContent");
			//DropColumn("dbo.Appointments", "ApprovedDate");
			//DropTable("dbo.Settings");
        }
    }
}
