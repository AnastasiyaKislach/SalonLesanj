using System.Web.Http;
using SalonLesanj.BusinessContracts;
using SalonLesanj.WebServices.Models;


namespace SalonLesanj.WebServices.Controllers {
	public class FeedBackController : ApiController {

		private IFeedBackManager feedBackManager;

		public FeedBackController(IFeedBackManager feedBackManager) {
			this.feedBackManager = feedBackManager;
		}

		[AllowAnonymous]
		public IHttpActionResult Post(FeedBackViewModel viewModel) {
			if (!ModelState.IsValid) {
				return BadRequest(ModelState);
			}

			feedBackManager.FeedBackForm(viewModel.Name, viewModel.Email, viewModel.Message);

			return Ok(viewModel);
		}
	}
}
