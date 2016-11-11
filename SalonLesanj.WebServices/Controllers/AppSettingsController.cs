using System.Web.Http;
using SalonLesanj.BusinessContracts;
using SalonLesanj.Entities;

namespace SalonLesanj.WebServices.Controllers {
	public class AppSettingsController : ApiController {
		protected ISettingsManager settingsManager { get; private set; }
		protected AppSettings Settings { get; private set; }

		public AppSettingsController(ISettingsManager settingsManager) {
			this.settingsManager = settingsManager;
		}
		protected virtual void InitSettings() {
			//StandardKernel kerner = new StandardKernel();
			//settingsManager = kerner.Get<ISettingsManager>();
			if (settingsManager != null) {
				Settings = settingsManager.GetAppSetting();
			}
			if (Settings == null) {
				Settings = new AppSettings();
			}
		}

		[AllowAnonymous]
		public virtual IHttpActionResult GetAll() {
			if (settingsManager != null) {
				Settings = settingsManager.GetAppSetting();
			}
			if (Settings == null) {
				Settings = new AppSettings();
			}
			return Ok(Settings);
		}

		[Authorize(Roles = "Admin")]
		[HttpPut]
		public virtual IHttpActionResult Put(AppSettings appSettings) {
			settingsManager.SetAppSetting(appSettings);
			return Ok();
		}

	}
}
