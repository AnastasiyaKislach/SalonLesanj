using System.Collections.Generic;
using SalonLesanj.Entities;

namespace SalonLesanj.WebServices.Models {
	public class BrandViewModel {
		public int Id { get; set; }

		public string Title { get; set; }

		public string ImageUrl { get; set; }

		public IEnumerable<DressViewModel> Dresses { get; set; }

		public BrandViewModel() {
			Dresses = new List<DressViewModel>();
		}

		public BrandViewModel(Brand brand)
			: this() {
			Id = brand.Id;
			Title = brand.Title;
			ImageUrl = brand.ImageUrl;
		}


	}
}