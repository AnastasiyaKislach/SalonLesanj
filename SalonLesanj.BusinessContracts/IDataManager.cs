using System;
using System.Linq;

namespace SalonLesanj.BusinessContracts {
	public interface IDataManager<T> : IDisposable {
		T Add(T item);
		IQueryable<T> GetAll();
		T GetById(int id);
		T Edit(T item);
		T Delete(int id);
	}
}
