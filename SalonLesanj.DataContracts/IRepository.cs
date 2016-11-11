using System.Linq;

namespace SalonLesanj.DataContracts {
	public interface IRepository<T> {
		T Create(T item);
		T GetById(int id);
		T Update(T item);
		T Delete(int id);
		IQueryable<T> GetAll();
	}
}
