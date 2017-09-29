using System.Web.Http;
using SalonLesanj.BusinessContracts;

namespace SalonLesanj.WebServices.Controllers {
	public class DataBaseController : ApiController {
		private IDataBaseManager dataBaseManager;

		public DataBaseController(IDataBaseManager dataBaseManager) {
			this.dataBaseManager = dataBaseManager;
		}

		[Authorize(Roles = "Admin")]
		public IHttpActionResult Post() {

			return Ok();
		}
	}
}
