using SalonLesanj.BusinessContracts;
using SalonLesanj.DataContracts;
using SalonLesanj.Entities;

namespace SalonLesanj.BLL {
	public class BrandManager : DataManager<Brand>, IBrandManager {

		private IUnitOfWork uow;

		public BrandManager(IUnitOfWork uoWork)
			: base(uoWork) {
			uow = uoWork;
		}
	}
}
