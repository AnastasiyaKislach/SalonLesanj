namespace SalonLesanj.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addition : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Appointments", "ApprovedDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.News", "PreviewContent", c => c.String(nullable: false, maxLength: 2048));
        }
        
        public override void Down()
        {
            DropColumn("dbo.News", "PreviewContent");
            DropColumn("dbo.Appointments", "ApprovedDate");
        }
    }
}
