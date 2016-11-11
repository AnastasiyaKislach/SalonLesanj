using System.Data.Entity;
using SalonLesanj.Entities;

namespace SalonLesanj.DAL {
	public class DataContext : DbContext {
		public DbSet<News> News { get; set; }
		public DbSet<Brand> Brands { get; set; }
		public DbSet<Kind> Kinds { get; set; }
		public DbSet<Dress> Dresses { get; set; }
		public DbSet<Accessory> Accessories { get; set; }
		public DbSet<Appointment> Appointments { get; set; }
		public DbSet<Setting> Settings { get; set; }

		public DataContext() : this("DBConnection") { }

		public DataContext(string connectionString)
			: base(connectionString) {
		}
	}
}
