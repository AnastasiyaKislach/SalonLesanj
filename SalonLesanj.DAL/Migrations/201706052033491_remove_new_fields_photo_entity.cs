namespace SalonLesanj.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class remove_new_fields_photo_entity : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Photos", "ImageUrl", c => c.String(nullable: false, maxLength: 1024));
            DropColumn("dbo.Photos", "ImageUrl1");
            DropColumn("dbo.Photos", "ImageUrl2");
            DropColumn("dbo.Photos", "ImageUrl3");
            DropColumn("dbo.Photos", "ImageUrl4");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Photos", "ImageUrl4", c => c.String(maxLength: 1024));
            AddColumn("dbo.Photos", "ImageUrl3", c => c.String(maxLength: 1024));
            AddColumn("dbo.Photos", "ImageUrl2", c => c.String(maxLength: 1024));
            AddColumn("dbo.Photos", "ImageUrl1", c => c.String(nullable: false, maxLength: 1024));
            DropColumn("dbo.Photos", "ImageUrl");
        }
    }
}
