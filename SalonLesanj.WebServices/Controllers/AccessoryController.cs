using SalonLesanj.BusinessContracts;
using SalonLesanj.Entities;
using SalonLesanj.WebServices.Models;

namespace SalonLesanj.WebServices.Controllers {
	public class AccessoryController : BaseController<Accessory, AccessoryViewModel> {
		private IAccessoryManager accessoryManager;
		private static string imagesPath = "/Images/";
		//private static string imagesPath = "/Images/Accessories/";

		public AccessoryController(IAccessoryManager accessoryManager)
			: base(accessoryManager) {
			this.accessoryManager = accessoryManager;
		}

		protected override AccessoryViewModel ToViewModel(Accessory model) {
			AccessoryViewModel vm = new AccessoryViewModel(model);
			vm.ImageUrl = imagesPath + vm.ImageUrl;
			return vm;
		}

		protected override Accessory ToModel(AccessoryViewModel viewModel) {
			Accessory accessory = new Accessory() {
				Id = viewModel.Id,
				Title = viewModel.Title,
				Description = viewModel.Description,
				ImageUrl = viewModel.ImageUrl,
				KindId = viewModel.KindId
			};
			return accessory;
		}
	}
}
