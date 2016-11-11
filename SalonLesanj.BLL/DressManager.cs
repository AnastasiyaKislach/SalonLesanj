using SalonLesanj.BusinessContracts;
using SalonLesanj.DataContracts;
using SalonLesanj.Entities;

namespace SalonLesanj.BLL {
	public class DressManager : DataManager<Dress>, IDressManager {

		private IUnitOfWork uow;

		public DressManager(IUnitOfWork uoWork)
			: base(uoWork) {
			this.uow = uoWork;
		}
	}
}
