using SalonLesanj.BusinessContracts;
using SalonLesanj.DataContracts;
using SalonLesanj.Entities;

namespace SalonLesanj.BLL {
	public class NewsManager : DataManager<News>, INewsManager {

		private IUnitOfWork uow;

		public NewsManager(IUnitOfWork uoWork)
			: base(uoWork) {
			uow = uoWork;
		}

		
	}
}
