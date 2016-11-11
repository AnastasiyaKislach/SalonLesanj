using SalonLesanj.Entities;

namespace SalonLesanj.WebServices.Models {
	public class DressViewModel {
		public int Id { get; set; }

		public string ImageUrl1 { get; set; }
		public string ImageUrl2 { get; set; }
		public string ImageUrl3 { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public int BrandId { get; set; }

		public DressViewModel() {
		}

		public DressViewModel(Dress dress) {
			Id = dress.Id;
			ImageUrl1 = dress.ImageUrl1;
			ImageUrl2 = dress.ImageUrl2;
			ImageUrl3 = dress.ImageUrl3;
			Title = dress.Title;
			Description = dress.Description;
			BrandId = dress.BrandId;
		}
	}
}