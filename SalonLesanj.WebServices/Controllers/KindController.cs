using System.Linq;
using SalonLesanj.BusinessContracts;
using SalonLesanj.Entities;
using SalonLesanj.WebServices.Models;

namespace SalonLesanj.WebServices.Controllers {
	public class KindController : BaseController<Kind, KindViewModel> {
		private IKindManager kindManager;
		private static string imagesPathAccessory = "/Images/";
		//private static string imagesPathAccessory = "/Images/Accessories/";

		public KindController(IKindManager kindManager)
			: base(kindManager) {
			this.kindManager = kindManager;
		}

		protected override KindViewModel ToViewModel(Kind model) {
			KindViewModel vm = new KindViewModel(model);
			vm.Accessories = model.Accessories.Select(i => new AccessoryViewModel(i) {
				ImageUrl = imagesPathAccessory + i.ImageUrl,
			}).ToList();
			return vm;
		}

		protected override Kind ToModel(KindViewModel viewModel) {
			Kind model = new Kind() {
				Id = viewModel.Id,
				Title = viewModel.Title,
				TitleRus = viewModel.TitleRus
			};
			return model;
		}
	}
}
//public KindController(IKindManager kindManager, ISettingsManager settingsManager)
//			: base(kindManager, settingsManager) {
//			this.kindManager = kindManager;
//			this.settingsManager = settingsManager;
//		}