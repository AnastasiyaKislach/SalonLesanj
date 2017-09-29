namespace SalonLesanj.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class resize_testimonials_text : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Testimonials", "Text", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Testimonials", "Text", c => c.String(nullable: false, maxLength: 2048));
        }
    }
}
