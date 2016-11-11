using SalonLesanj.Entities;

namespace SalonLesanj.WebServices.Models {
	public class AccessoryViewModel {
		public int Id { get; set; }
		public string Title { get; set; }
		public string ImageUrl { get; set; }
		public string Description { get; set; }
		public int KindId { get; set; }

		public AccessoryViewModel() {
		}

		public AccessoryViewModel(Accessory accessory) {
			Id = accessory.Id;
			Title = accessory.Title;
			ImageUrl = accessory.ImageUrl;
			Description = accessory.Description;
			KindId = accessory.KindId;
		}
	}
}