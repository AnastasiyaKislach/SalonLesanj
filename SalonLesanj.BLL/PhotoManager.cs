using SalonLesanj.BusinessContracts;
using SalonLesanj.DataContracts;
using SalonLesanj.Entities;

namespace SalonLesanj.BLL {
	public class PhotoManager : DataManager<Photo>, IPhotoManager {
		private IUnitOfWork uow;
		public PhotoManager(IUnitOfWork uoWork)
			: base(uoWork) {
			uow = uoWork;
		}

	}
}
