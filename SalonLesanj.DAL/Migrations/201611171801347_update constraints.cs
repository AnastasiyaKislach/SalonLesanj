namespace SalonLesanj.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateconstraints : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Accessories", "Description", c => c.String(maxLength: 2048));
            AlterColumn("dbo.News", "Content", c => c.String(maxLength: 2048));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.News", "Content", c => c.String(nullable: false, maxLength: 2048));
            AlterColumn("dbo.Accessories", "Description", c => c.String(nullable: false, maxLength: 2048));
        }
    }
}
