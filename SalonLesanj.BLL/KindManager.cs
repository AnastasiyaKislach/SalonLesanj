using SalonLesanj.BusinessContracts;
using SalonLesanj.DataContracts;
using SalonLesanj.Entities;

namespace SalonLesanj.BLL {
	public class KindManager : DataManager<Kind>, IKindManager {
		private IUnitOfWork uow;
		public KindManager(IUnitOfWork uoWork)
			: base(uoWork) {
			uow = uoWork;
		}
	}
}
