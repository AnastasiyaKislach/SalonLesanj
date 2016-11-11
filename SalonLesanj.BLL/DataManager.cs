using System;
using System.Linq;
using SalonLesanj.BusinessContracts;
using SalonLesanj.DataContracts;

namespace SalonLesanj.BLL {
	public abstract class DataManager<T> : IDataManager<T> where T : class {

		private IRepository<T> repository;
		private bool disposed;

		protected readonly IUnitOfWork DataContext;

		public DataManager(IUnitOfWork uow) {
			this.DataContext = uow;
			repository = uow.GetRepository<T>();
		}
		public T Add(T item) {
			return repository.Create(item);
		}

		public IQueryable<T> GetAll() {
			return repository.GetAll();
		}

		public T GetById(int id) {
			return repository.GetById(id);
		}

		public T Edit(T item) {
			return repository.Update(item);
		}

		public T Delete(int id) {
			return repository.Delete(id);
		}

		public void Dispose() {
			Dispose(true);
			GC.SuppressFinalize(this);
		}

		protected virtual void Dispose(bool disposing) {
			if (!disposed) {
				if (disposing) {
					DataContext.Dispose();
				}
				disposed = true;
			}
		}
	}
}
