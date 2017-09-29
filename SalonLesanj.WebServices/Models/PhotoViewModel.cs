using SalonLesanj.Entities;

namespace SalonLesanj.WebServices.Models {
	public class PhotoViewModel {
		public int Id { get; set; }

		public string Author { get; set; }

		public string ImageUrl { get; set; }
		
		public PhotoViewModel() { }

		public PhotoViewModel(Photo photo) {
			Id = photo.Id;
			Author = photo.Author;
			ImageUrl = photo.ImageUrl;
		}
	}
}