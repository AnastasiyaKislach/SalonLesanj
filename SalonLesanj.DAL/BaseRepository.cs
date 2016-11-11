using System.Data.Entity;
using System.Linq;
using SalonLesanj.DataContracts;

namespace SalonLesanj.DAL {
	public class BaseRepository<T> : IRepository<T> where T : class {

		private DbContext db;
		protected DbSet<T> Items;

		public BaseRepository(DbContext db) {
			this.db = db;
			Items = db.Set<T>();
		}
		public T Create(T item) {
			T t = Items.Add(item);
			db.SaveChanges();
			return t;
		}

		public T GetById(int id) {
			return Items.Find(id);
		}

		public T Update(T item) {
			db.Entry(item).State = EntityState.Modified;
			db.SaveChanges();
			return item;
		}

		public T Delete(int id) {
			T item = Items.Find(id);
			T delete = Items.Remove(item);
			db.SaveChanges();
			return delete;
		}

		public IQueryable<T> GetAll() {
			return Items;
		}
	}
}
