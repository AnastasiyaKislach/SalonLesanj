using SalonLesanj.BusinessContracts;
using SalonLesanj.Entities;
using SalonLesanj.WebServices.Models;

namespace SalonLesanj.WebServices.Controllers {
	public class PhotoController : BaseController<Photo, PhotoViewModel> {
		private IPhotoManager photoManager;
		private static string imagesPath = "/Images/";

		public PhotoController(IPhotoManager photoManager)
			: base(photoManager) {
			this.photoManager = photoManager;

		}

		protected override PhotoViewModel ToViewModel(Photo model) {
			PhotoViewModel vm = new PhotoViewModel(model);
			vm.ImageUrl = imagesPath + vm.ImageUrl;
			return vm;
		}

		protected override Photo ToModel(PhotoViewModel viewModel) {
			Photo model = new Photo{
				Id = viewModel.Id,
				Author = viewModel.Author,
				ImageUrl = viewModel.ImageUrl
			};
			return model;
		}
	}
}
