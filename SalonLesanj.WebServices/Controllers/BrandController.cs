using System.Linq;
using SalonLesanj.BusinessContracts;
using SalonLesanj.Entities;
using SalonLesanj.WebServices.Models;

namespace SalonLesanj.WebServices.Controllers {
	public class BrandController : BaseController<Brand, BrandViewModel> {
		private IBrandManager brandManager;
		private static string imagesPath = "/Images/";
		//private static string imagesPath = "/Images/Brands/";
		//private static string imagesPathDress = "/Images/Dresses/";

		public BrandController(IBrandManager brandManager)
			: base(brandManager) {
			this.brandManager = brandManager;
		}

		protected override BrandViewModel ToViewModel(Brand model) {
			BrandViewModel vm = new BrandViewModel(model);
			vm.ImageUrl = imagesPath + vm.ImageUrl;
			vm.Dresses = model.Dresses.Select(i => new DressViewModel(i) {
				ImageUrl1 = imagesPath + i.ImageUrl1,
				ImageUrl2 = imagesPath + i.ImageUrl2,
				ImageUrl3 = imagesPath + i.ImageUrl3
			}).ToList();
			return vm;
		}

		protected override Brand ToModel(BrandViewModel viewModel) {
			Brand brand = new Brand() {
				Id = viewModel.Id,
				Title = viewModel.Title,
				ImageUrl = viewModel.ImageUrl
			};
			return brand;
		}
	}
}
