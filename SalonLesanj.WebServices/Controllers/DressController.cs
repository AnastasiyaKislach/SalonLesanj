using SalonLesanj.BusinessContracts;
using SalonLesanj.Entities;
using SalonLesanj.WebServices.Models;

namespace SalonLesanj.WebServices.Controllers {
	public class DressController : BaseController<Dress, DressViewModel> {
		private IDressManager dressManager;
		private static string imagesPath = "/Images/";
		//private static string imagesPath = "/Images/Dresses/";

		public DressController(IDressManager dressManager)
			: base(dressManager) {
			this.dressManager = dressManager;
		}

		protected override DressViewModel ToViewModel(Dress model) {
			DressViewModel vm = new DressViewModel(model);
			vm.ImageUrl1 = imagesPath + vm.ImageUrl1;
			vm.ImageUrl2 = imagesPath + vm.ImageUrl2;
			vm.ImageUrl3 = imagesPath + vm.ImageUrl3;
			return vm;
		}

		protected override Dress ToModel(DressViewModel viewModel) {
			Dress model = new Dress() {
				Id = viewModel.Id,
				Title = viewModel.Title,
				Description = viewModel.Description,
				ImageUrl1 = viewModel.ImageUrl1,
				ImageUrl2 = viewModel.ImageUrl2,
				ImageUrl3 = viewModel.ImageUrl3,
				BrandId = viewModel.BrandId,
			};
			return model;
		}
	}
}
