using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SalonLesanj.BusinessContracts;
using SalonLesanj.DataContracts;

namespace SalonLesanj.BLL {
	public class DataBaseManager : IDataBaseManager {

		//private IRepository<T> repository;
		private bool disposed;

		protected readonly IUnitOfWork DataContext;

		public DataBaseManager(IUnitOfWork uow) {
			this.DataContext = uow;
			//repository = uow.GetRepository<T>();
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
