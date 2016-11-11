using System;
using System.Linq;
using SalonLesanj.DataContracts;
using SalonLesanj.Entities;

namespace SalonLesanj.DAL {
	public class UnitOfWork : IUnitOfWork {

		private DataContext dataContext;
		private bool disposed;

		private IRepository<News> news;
		private IRepository<Brand> brands;
		private IRepository<Kind> kinds;
		private IRepository<Dress> dresses;
		private IRepository<Accessory> accessories;
		private IRepository<Appointment> appointment;
		private IRepository<Setting> settings;

		public IRepository<News> News {
			get { return news ?? (news = new BaseRepository<News>(dataContext)); }
		}

		public IRepository<Brand> Brands {
			get { return brands ?? new BaseRepository<Brand>(dataContext); }
		}

		public IRepository<Kind> Kinds {
			get { return kinds ?? new BaseRepository<Kind>(dataContext); }
		}

		public IRepository<Dress> Dresses {
			get { return dresses ?? new BaseRepository<Dress>(dataContext); }
		}

		public IRepository<Accessory> Accessories {
			get { return accessories ?? new BaseRepository<Accessory>(dataContext); }
		}

		public IRepository<Appointment> Appointments {
			get { return appointment ?? new BaseRepository<Appointment>(dataContext); }
		}

		public IRepository<Setting> Settings {
			get { return settings ?? new BaseRepository<Setting>(dataContext); }
		}

		//public void SaveChanges() {
		//	dataContext.SaveChanges();
		//}

		public UnitOfWork(string connectionString) {
			dataContext = new DataContext(connectionString);

		}

		public virtual IRepository<T> GetRepository<T>() {
			var property = GetType().GetProperties().FirstOrDefault(i => i.PropertyType == typeof(IRepository<T>));

			return (IRepository<T>)property.GetValue(this);
		} 

		public void Dispose() {
			Dispose(true);
			GC.SuppressFinalize(this);
		}

		protected virtual void Dispose(bool disposing) {
			if (!disposed) {
				if (disposing) {
					dataContext.Dispose();
				}
				disposed = true;
			}
		}
	}
}
