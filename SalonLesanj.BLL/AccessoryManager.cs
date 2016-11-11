using SalonLesanj.BusinessContracts;
using SalonLesanj.DataContracts;
using SalonLesanj.Entities;

namespace SalonLesanj.BLL {
	public class AccessoryManager : DataManager<Accessory>, IAccessoryManager {

		private IUnitOfWork uow;
		public AccessoryManager(IUnitOfWork uoWork)
			: base(uoWork) {
			uow = uoWork;
		}
	}
}
